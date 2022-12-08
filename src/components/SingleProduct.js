import classes from "../styles/SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { single_product_url } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./generalComponents/Loading";
import CurrentLocation from "./generalComponents/CurrentLocation";
import { TiTick } from "react-icons/ti";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import { cartActions } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productColor, setProductColor] = useState("");
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`${single_product_url}${id}`);
      const data = await res.json();
      const images = [];
      data.images.forEach((image) => {
        images.push({
          large: image.thumbnails.large.url,
          full: image.thumbnails.full.url,
        });
      });
      setProductData({
        name: data.name,
        reviews: data.reviews,
        stars: data.stars,
        price: data.price / 100,
        description: data.description,
        stock: data.stock,
        sku: data.id,
        brand: data.company,
        colors: data.colors,
        images: images,
      });
      setProductColor(data.colors[0]);
      setLoading(false);
    })();
  }, [setLoading, id]);

  const decProductHandler = (event) => {
    if (loading || productQuantity <= 1) return;
    setProductQuantity((prev) => prev - 1);
  };

  const incProductHandler = (event) => {
    if (loading || productQuantity === productData?.stock) return;
    setProductQuantity((prev) => prev + 1);
  };

  const btnAddToCartHandler = (event) => {
    if (loading) return;
    let isPresent = false;
    for (let i in cartItems) {
      if (cartItems[i].id === id) isPresent = true;
    }
    if (isPresent) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id !== id) return item;
        const updatedItem = { ...item };
        updatedItem.quantity += productQuantity;
        updatedItem.quantity =
          updatedItem.quantity > productData.stock
            ? productData.stock
            : updatedItem.quantity;
        return updatedItem;
      });
      dispatch(cartActions.updateQuantityOfItem(updatedCartItems));
    }
    // update the store cart.
    else {
      dispatch(
        cartActions.addProductToCart({
          id: id,
          name: productData.name,
          thumbnail: productData.images[0].large,
          color: productColor,
          price: productData.price,
          quantity: productQuantity,
          stock: productData.stock,
        })
      );
    }
    // navigate to cart.
    navigate("/cart");
  };

  const imagesGrid = (
    <div className={classes["product-grid-images"]}>
      <div className={classes["big-image-layout"]}>
        <img
          src={productData?.images[currentImageIdx].full}
          alt={productData?.name}
        />
      </div>
      <div className={classes["small-images-layout"]}>
        {productData?.images.map((image, idx) => (
          <img
            key={idx}
            src={image.large}
            alt={productData?.name}
            className={classes[currentImageIdx === idx ? "current-img" : ""]}
            id={idx}
            onClick={(event) => setCurrentImageIdx(+event.target.id)}
          />
        ))}
      </div>
    </div>
  );

  const singlePageEle = (
    <>
      <CurrentLocation
        locationArray={["home", "products", productData?.name]}
      />
      <div className={classes["single-product-info"]}>
        <Link to="/products">back to products</Link>
        <div className={classes["product-grid"]}>
          {imagesGrid}
          <div className={classes["product-grid-info"]}>
            <h1>{productData?.name}</h1>
            <div className={classes["star-reviews"]}>
              <div className={classes["stars"]}>
                {[...Array(Math.floor(productData?.stars ?? 0)).keys()].map(
                  (_, i) => (
                    <RiStarFill key={i} />
                  )
                )}
                {productData?.stars % 1 && <RiStarHalfFill />}
                {[...Array(5 - Math.ceil(productData?.stars ?? 0)).keys()].map(
                  (_, i) => (
                    <RiStarLine key={i} />
                  )
                )}
              </div>
              <span>({productData?.reviews} customer reviews)</span>
            </div>
            <span className={classes["product-price"]}>
              ${productData?.price}
            </span>
            <p className={classes["product-description"]}>
              {productData?.description}
            </p>
            <div className={classes["product-avalibility"]}>
              <span className={classes["key"]}>Available:</span>
              <span className={classes["value"]}>
                {productData?.stock > 0 ? "In Stock" : "Out of stock"}
              </span>

              <span className={classes["key"]}>SKU:</span>
              <span className={classes["value"]}>{productData?.sku}</span>

              <span className={classes["key"]}>Brand:</span>
              <span className={classes["value"]}>{productData?.brand}</span>
            </div>
            <hr />
            <div className={classes["product-colors"]}>
              <span className={classes["key"]}>colors :</span>
              <div
                className={classes["colors-list"]}
                onChange={(event) => setProductColor(event.target.value)}
              >
                {productData?.colors.map((color, idx) => (
                  <div key={idx} className={classes["color"]}>
                    <label
                      htmlFor={color}
                      style={{ backgroundColor: color }}
                      className={
                        productColor === color ? classes["active-color"] : ""
                      }
                    >
                      <TiTick />
                    </label>
                    <input name="color" type="radio" id={color} value={color} />
                  </div>
                ))}
              </div>
            </div>
            <div className={classes["product-quantity"]}>
              <button
                className={classes["btn-cart"]}
                onClick={decProductHandler}
              >
                -
              </button>
              <span>{productQuantity}</span>
              <button
                className={classes["btn-cart"]}
                onClick={incProductHandler}
              >
                +
              </button>
            </div>
            <button
              className={classes["btn-add-to-cart"]}
              onClick={btnAddToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <section className={classes["min-height"]}>
      {loading ? <Loading /> : singlePageEle}
    </section>
  );
}
