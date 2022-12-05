import classes from "../styles/Checkout.module.css";
import { Fragment } from "react";
import CurrentLocation from "./generalComponents/CurrentLocation";

export default function Checkout() {
  return (
    <Fragment>
      <CurrentLocation locationArray={["home", "checkout"]} />
      <section className={classes["checkout"]}>
        <h1>Comming Soon 🙂</h1>
        <p>Stay tuned 😉</p>
      </section>
    </Fragment>
  );
}
