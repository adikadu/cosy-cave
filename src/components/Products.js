import classes from "../styles/Products.module.css";
import CurrentLocation from "./generalComponents/CurrentLocation";
import Filters from "./Filters";
import ProductsGrid from "./ProductsGrid";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "./generalComponents/Loading";

export default function Products() {
  const isLoading = useSelector((state) => state.loading.status);
  if (isLoading) return <Loading />;
  return (
    <Fragment>
      <CurrentLocation locationArray={["home", "products"]} />
      <section className={classes["products"]}>
        <Filters />
        <ProductsGrid />
      </section>
    </Fragment>
  );
}
