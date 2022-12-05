import classes from "../styles/Error.module.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className={classes["error"]}>
      <h1>404</h1>
      <p>Sorry the page you are looking for cannot be found 😔</p>
      <Link to="/">Home Page</Link>
    </div>
  );
}
