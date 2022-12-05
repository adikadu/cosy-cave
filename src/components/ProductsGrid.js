import GalleryCard from "./generalComponents/GalleryCard";

import classes from "../styles/ProductsGrid.module.css";
import { RiLayoutGridFill } from "react-icons/ri";
import { BsList } from "react-icons/bs";

import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import {
  sortByKey,
  sortFromSearchFilter,
  sortFromCategoryFilter,
  sortFromCompanyFilter,
  sortFromColorFilter,
  sortFromPriceFilter,
  sortFromFreeShippingFilter,
} from "../utils/sortFunctions";

export default function ProductsGrid() {
  const productsList = useSelector((state) => state.products.productsList);
  let [localProductsList, setLocalProductsList] = useState([...productsList]);
  const [isLandscape, setIsLandscape] = useState(false);
  const searchFilterInp = useSelector((state) => state.filters.search);
  const category = useSelector((state) => state.filters.category);
  const company = useSelector((state) => state.filters.company);
  const color = useSelector((state) => state.filters.color);
  const price = useSelector((state) => state.filters.price);
  const isFreeShippingChecked = useSelector(
    (state) => state.filters.freeShipping
  );

  useEffect(() => {
    setLocalProductsList(
      sortFromSearchFilter([...productsList], searchFilterInp)
    );
  }, [searchFilterInp, productsList]);

  useEffect(() => {
    if (category === "all") setLocalProductsList([...productsList]);
    else
      setLocalProductsList(sortFromCategoryFilter([...productsList], category));
  }, [category, productsList]);

  useEffect(() => {
    if (company === "all") setLocalProductsList([...productsList]);
    else
      setLocalProductsList(sortFromCompanyFilter([...productsList], company));
  }, [company, productsList]);

  useEffect(() => {
    if (color === "all") setLocalProductsList([...productsList]);
    else setLocalProductsList(sortFromColorFilter([...productsList], color));
  }, [color, productsList]);

  useEffect(() => {
    setLocalProductsList(sortFromPriceFilter([...productsList], price));
  }, [price, productsList]);

  useEffect(() => {
    if (!isFreeShippingChecked) setLocalProductsList([...productsList]);
    else setLocalProductsList(sortFromFreeShippingFilter([...productsList]));
  }, [isFreeShippingChecked, productsList]);

  const getProductsSorted = useCallback(
    (event) => {
      if (!event) {
        setLocalProductsList(sortByKey("price", "asc", [...productsList]));
        return;
      }

      switch (event.target.value) {
        case "price-low":
          setLocalProductsList(sortByKey("price", "asc", [...productsList]));
          break;

        case "price-high":
          setLocalProductsList(sortByKey("price", "desc", [...productsList]));
          break;

        case "name-a-z":
          setLocalProductsList(sortByKey("name", "asc", [...productsList]));
          break;

        case "name-z-a":
          setLocalProductsList(sortByKey("name", "desc", [...productsList]));
          break;

        default:
          setLocalProductsList(sortByKey("price", "asc", [...productsList]));
      }
    },
    [productsList]
  );

  useEffect(() => {
    getProductsSorted();
  }, [getProductsSorted]);

  const renderProductsList =
    localProductsList.length > 0 ? (
      localProductsList.map((product) => (
        <GalleryCard
          key={product.id}
          id={product.id}
          isLandscape={isLandscape}
          imgSrc={product.image}
          productName={product.name}
          productPrice={`$${product.price}`}
          productDescription={product.description}
        />
      ))
    ) : (
      <p className={classes["products-not-found"]}>
        Sorry, No products found :(
      </p>
    );
  return (
    <div className={classes["products"]}>
      <div className={classes["products-metadata"]}>
        <div className={classes["buttons"]}>
          <button>
            <RiLayoutGridFill onClick={() => setIsLandscape(false)} />
          </button>
          <button>
            <BsList onClick={() => setIsLandscape(true)} />
          </button>
        </div>
        <span>{localProductsList.length} Products Found</span>
        <hr />
        <form>
          <label htmlFor="sort-list">Sort By</label>
          <select name="sort-list" id="sort-list" onChange={getProductsSorted}>
            <option value="price-low">Price (Lowest)</option>
            <option value="price-high">Price (Highest)</option>
            <option value="name-a-z">Name (A-Z)</option>
            <option value="name-z-a">Name (Z-A)</option>
          </select>
        </form>
      </div>
      <div
        className={`${classes["products-grid"]} ${
          isLandscape ? classes["landscape"] : ""
        }`}
      >
        {renderProductsList}
      </div>
    </div>
  );
}
