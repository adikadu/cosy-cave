import classes from "../styles/Nav.module.css";
import { useState } from "react";
import logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

import { loginStatusActions } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [showSidebar, setShowSidebar] = useState(false);

  const userLoginHandler = () => {
    dispatch(loginStatusActions.toggleUserStatus());
  };
  return (
    <nav className={classes["nav"]}>
      <Link className={classes["logo"]} to="/">
        <img src={logo} alt="cosy cave logo" />
      </Link>
      <div className={classes["wide-screen-nav"]}>
        <ul className={classes["nav-links"]}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          {state.loginStatus.status && (
            <li>
              <NavLink to="/checkout">Checkout</NavLink>
            </li>
          )}
        </ul>
        <div>
          <Link className={classes["link-to-cart"]} to="cart">
            <div className={classes["cart"]}>
              <span>Cart</span>{" "}
              <div className={classes["basket"]}>
                <FaShoppingCart />
                <span className={classes["num-products"]}>
                  {state.cart.reduce((prev, curr) => {
                    return prev + curr.quantity;
                  }, 0)}
                </span>
              </div>
            </div>
          </Link>
          <button
            className={classes["btn-log-status"]}
            onClick={userLoginHandler}
          >
            {!state.loginStatus.status && (
              <>
                Login <FaUserPlus />
              </>
            )}
            {state.loginStatus.status && (
              <>
                Logout <FaUserMinus />
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className={`${classes["small-screen-nav"]} ${
          showSidebar ? classes["active"] : ""
        }`}
      >
        <GiHamburgerMenu
          className={classes["hamburger"]}
          onClick={() => setShowSidebar(true)}
        />
        <div className={classes["sidebar"]}>
          <MdOutlineClose
            className={classes["btn-close"]}
            onClick={() => setShowSidebar(false)}
          />
          <div className={classes["cart-logout"]}>
            <Link to="cart">
              <div className={classes["cart"]}>
                <span>Cart</span>{" "}
                <div className={classes["basket"]}>
                  <FaShoppingCart />
                  <span className={classes["num-products"]}>
                    {state.cart.reduce((prev, curr) => {
                      return prev + curr.quantity;
                    }, 0)}
                  </span>
                </div>
              </div>
            </Link>
            <button className={classes["btn-log-status"]}>
              Logout <FaUserMinus />
            </button>
          </div>
          <ul className={classes["nav-links"]}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/checkout">Checkout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
