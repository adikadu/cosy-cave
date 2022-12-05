import classes from "../styles/Filters.module.css";
import { TiTick } from "react-icons/ti";

import { filtersActions } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";

export default function Filter() {
  const priceInpMinVal = 0;
  const priceInpMaxVal = 3100;

  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.filters.category);
  const currentColor = useSelector((state) => state.filters.color);
  const [priceInpValue, setPriceInpValue] = useState(3100);
  const searchFilterRef = useRef("");
  const companyFilterRef = useRef("all");
  const freeShippingRef = useRef(false);

  const priceInpEventHandler = (event) => {
    setPriceInpValue(event.target.value);
    dispatch(filtersActions.setPriceFilter(event.target.value));
  };

  const clearBtnHandler = (event) => {
    dispatch(filtersActions.setToInitialValue());
    searchFilterRef.current.value = "";
    companyFilterRef.current.value = "all";
    setPriceInpValue(3100);
    dispatch(filtersActions.setPriceFilter(3100));
    freeShippingRef.current.checked = false;
  };

  return (
    <div className={classes["filters"]}>
      <div className={classes["pos-sticky"]}>
        <input
          type="text"
          name="search"
          id="search"
          ref={searchFilterRef}
          className={classes["search"]}
          placeholder="Search"
          onChange={(event) =>
            dispatch(filtersActions.setSearchFilter(event.target.value))
          }
        />
        <div className={classes["categories"]}>
          <span className={classes["filter-heading"]}>Category</span>
          <ul
            onClick={(event) =>
              dispatch(
                filtersActions.setCategoryFilter(event.target.textContent)
              )
            }
          >
            <li
              className={
                currentCategory === "all" ? classes["active-category"] : ""
              }
            >
              all
            </li>
            <li
              className={
                currentCategory === "office" ? classes["active-category"] : ""
              }
            >
              office
            </li>
            <li
              className={
                currentCategory === "living room"
                  ? classes["active-category"]
                  : ""
              }
            >
              living room
            </li>
            <li
              className={
                currentCategory === "kitchen" ? classes["active-category"] : ""
              }
            >
              kitchen
            </li>
            <li
              className={
                currentCategory === "bedroom" ? classes["active-category"] : ""
              }
            >
              bedroom
            </li>
            <li
              className={
                currentCategory === "dining" ? classes["active-category"] : ""
              }
            >
              dining
            </li>
            <li
              className={
                currentCategory === "kids" ? classes["active-category"] : ""
              }
            >
              kids
            </li>
          </ul>
        </div>
        <form className={classes["company"]}>
          <label htmlFor="company" className={classes["filter-heading"]}>
            Company
          </label>
          <select
            name="company"
            id="company"
            ref={companyFilterRef}
            onChange={(event) =>
              dispatch(filtersActions.setCompanyFilter(event.target.value))
            }
          >
            <option value="all">All</option>
            <option value="marcos">Marcos</option>
            <option value="liddy">Liddy</option>
            <option value="ikea">Ikea</option>
            <option value="caressa">Caressa</option>
          </select>
        </form>
        <form className={classes["colors"]}>
          <span className={classes["filter-heading"]}>Colors</span>
          <div
            className={classes["colors-list"]}
            onChange={(event) =>
              dispatch(filtersActions.setColorsFilter(event.target.value))
            }
          >
            <div className={classes["color"]}>
              <label htmlFor="all" style={{ backgroundColor: "transparent" }}>
                All
              </label>
              <input name="color" type="radio" id="all" value="all" />
            </div>
            <div className={classes["color"]}>
              <label
                htmlFor="red"
                style={{ backgroundColor: "rgb(255, 0, 0)" }}
                className={
                  currentColor === "red" ? classes["active-color"] : ""
                }
              >
                <TiTick />
              </label>
              <input name="color" type="radio" id="red" value="red" />
            </div>
            <div className={classes["color"]}>
              <label
                htmlFor="green"
                style={{ backgroundColor: "rgb(0, 255, 0)" }}
                className={
                  currentColor === "green" ? classes["active-color"] : ""
                }
              >
                <TiTick />
              </label>
              <input name="color" type="radio" id="green" value="green" />
            </div>
            <div className={classes["color"]}>
              <label
                htmlFor="blue"
                style={{ backgroundColor: "rgb(0, 0, 255)" }}
                className={
                  currentColor === "blue" ? classes["active-color"] : ""
                }
              >
                <TiTick />
              </label>
              <input name="color" type="radio" id="blue" value="blue" />
            </div>
            <div className={classes["color"]}>
              <label
                htmlFor="black"
                style={{ backgroundColor: "rgb(0, 0, 0)" }}
                className={
                  currentColor === "black" ? classes["active-color"] : ""
                }
              >
                <TiTick />
              </label>
              <input name="color" type="radio" id="black" value="black" />
            </div>
            <div className={classes["color"]}>
              <label
                htmlFor="yellow"
                style={{ backgroundColor: "rgb(255, 185, 0)" }}
                className={
                  currentColor === "yellow" ? classes["active-color"] : ""
                }
              >
                <TiTick />
              </label>
              <input name="color" type="radio" id="yellow" value="yellow" />
            </div>
          </div>
        </form>
        <form className={classes["price"]}>
          <span className={classes["filter-heading"]}>Price</span>
          <label htmlFor="price">${priceInpValue}</label>
          <input
            type="range"
            id="price"
            name="price"
            min={priceInpMinVal}
            max={priceInpMaxVal}
            value={priceInpValue}
            onChange={priceInpEventHandler}
          />
        </form>
        <form className={classes["free-shipping"]}>
          <label htmlFor="free-shipping">Free Shipping</label>
          <input
            type="checkbox"
            name="free-shipping"
            id="free-shipping"
            ref={freeShippingRef}
            onChange={(event) =>
              dispatch(
                filtersActions.setFreeShippingFilter(event.target.checked)
              )
            }
          />
        </form>
        <button className={classes["clear-filter"]} onClick={clearBtnHandler}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
