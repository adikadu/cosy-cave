import classes from "../../styles/GeneralComponents/Card.module.css";

export default function Card(props) {
  return (
    <div className={classes["card"]}>
      {props.children}
      <h3>{props.keyword}</h3>
      <p>{props.desc}</p>
    </div>
  );
}
