import classes from "../../styles/HomeComponents/FeatureProducts.module.css";
import { Link } from "react-router-dom";
import GalleryCard from "../generalComponents/GalleryCard";
import { useSelector } from "react-redux";
import Loading from "../generalComponents/Loading";

export default function FeatureProducts() {
  const isLoading = useSelector((state) => state.loading.status);
  const products = useSelector((state) => state.products.productsList);
  const topThreeProducts = [products[0], products[1], products[2]];
  if (isLoading) return <Loading />;
  return (
    <section className={classes["feature-products"]}>
      <h2>Feature Products</h2>
      <hr />
      <div className={classes["feature-products-gallery"]}>
        {topThreeProducts.map((product) => (
          <GalleryCard
            key={product.id}
            imgSrc={product.image}
            productName={product.name}
            productPrice={product.price}
          />
        ))}
      </div>
      <Link className={classes["all-products-link"]} to="/products">
        all products
      </Link>
    </section>
  );
}
