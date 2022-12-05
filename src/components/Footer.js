import classes from "../styles/Footer.module.css";

export default function Footer() {
  const date = new Date();
  return (
    <p className={classes["footer"]}>
      &copy; {date.getFullYear()} <span>CosyCave</span> All rights reserved
    </p>
  );
}
