import classes from "../styles/Cart.module.css";
import CurrentLocation from "./generalComponents/CurrentLocation";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import TableCell from "./generalComponents/TableCell";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStatusActions, cartActions } from "../store/store";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);
  const loginStatus = useSelector((state) => state.loginStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let subTotal = 0;
  cartItems.forEach((item) => (subTotal += item.price * item.quantity));
  const shippingFee = cartItems.length ? 5.34 : 0;
  const checkoutHandler = () => {
    if (loginStatus.status) {
      navigate("/checkout");
      return;
    }
    dispatch(loginStatusActions.loginUser());
  };

  return (
    <Fragment>
      <CurrentLocation locationArray={["home", "cart"]} />
      <div className={classes["cart"]}>
        <div className={classes["cart-items"]}>
          <div className={classes["table-title"]}>
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          <hr className={classes["table-top-hr"]} />
          <div className={classes["table-cells"]}>
            {cartItems.map((item) => (
              <TableCell
                key={item.id}
                id={item.id}
                img={item.thumbnail}
                title={item.name}
                color={item.color}
                price={item.price}
                quantity={item.quantity}
                stock={item.stock}
              />
            ))}
          </div>
          <hr />
        </div>
        <div className={classes["links"]}>
          <Link className={classes["link-continue-shopping"]} to="/products">
            continue shopping
          </Link>
          <button
            onClick={() => dispatch(cartActions.updateQuantityOfItem([]))}
            className={classes["link-clear-cart"]}
          >
            clear shopping cart
          </button>
        </div>
        <div className={classes["checkout-section"]}>
          <div className={classes["fees"]}>
            <div className={classes["sub-total"]}>
              <div className={classes["total"]}>
                <span>Subtotal:</span> <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className={classes["shipping-fees"]}>
                <span>Shipping Fee:</span> <span>${shippingFee}</span>
              </div>
            </div>
            <hr />
            <span className={classes["order-total"]}>
              <span>Order Total:</span>
              <span>${(subTotal + shippingFee).toFixed(2)}</span>
            </span>
          </div>
          {
            <button onClick={checkoutHandler}>
              {loginStatus.status ? "checkout" : "login"}
            </button>
          }
        </div>
      </div>
    </Fragment>
  );
}
