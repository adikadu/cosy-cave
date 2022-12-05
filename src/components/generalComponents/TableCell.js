import classes from "../../styles/GeneralComponents/TableCell.module.css";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/store";

export default function TableCell({
  id,
  img,
  title,
  color,
  price,
  quantity,
  stock,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const updateHandler = (updator) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id !== id) return item;
      const updatedItem = { ...item };
      if (updator === -1) {
        updatedItem.quantity =
          item.quantity > 1 ? item.quantity - 1 : item.quantity;
      } else {
        updatedItem.quantity =
          item.quantity >= stock ? item.quantity : item.quantity + 1;
      }
      return updatedItem;
    });
    dispatch(cartActions.updateQuantityOfItem(updatedCart));
  };

  return (
    <div className={classes["cell"]}>
      <div className={classes["item-col"]}>
        <img src={img} alt={title} />
        <div className={classes["item-info"]}>
          <span className={classes["item-title"]}>{title}</span>
          <div className={classes["color"]}>
            <span>Color:</span>{" "}
            <span
              style={{ backgroundColor: color }}
              className={classes["color-box"]}
            ></span>
            <span
              className={classes["small-screen-price"]}
            >{`$${price.toLocaleString()}`}</span>
          </div>
        </div>
      </div>
      <span className={classes["item-price"]}>{`$${price.toFixed(2)}`}</span>
      <div className={classes["item-quantity"]}>
        <button onClick={() => updateHandler(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => updateHandler(1)}>+</button>
      </div>
      <span className={classes["item-subtotal"]}>{`$${(
        price * quantity
      ).toFixed(2)}`}</span>
      <button className={classes["item-remove"]}>
        <RiDeleteBin7Fill
          onClick={() =>
            dispatch(
              cartActions.updateQuantityOfItem(
                cartItems.filter((item) => item.id !== id)
              )
            )
          }
        />
      </button>
    </div>
  );
}
