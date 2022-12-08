import classes from "../../styles/GeneralComponents/GalleryCard.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function GalleryCard(props) {
  if (props.isLandscape)
    return (
      <div className={classes["gallery-card-landscape"]}>
        <img src={props.imgSrc} alt={props.productName} />
        <div className={classes["product-info"]}>
          <h2>{props.productName}</h2>
          <span>{props.productPrice}</span>
          <p>{`${props.productDescription.slice(0, 150)}...`}</p>
          <Link to={`/products/${props.id}`}>Details</Link>
        </div>
      </div>
    );

  return (
    <div className={classes["gallery-card"]}>
      <div className={classes["image"]}>
        <div className={classes["backdrop"]}></div>
        <img src={props.imgSrc} alt={props.productName} />
        <Link to={`/product/${props.id}`}>
          <FaSearch />
        </Link>
      </div>
      <div className={classes["product-info"]}>
        <span>{props.productName}</span>
        <span>{props.productPrice}</span>
      </div>
    </div>
  );
}
