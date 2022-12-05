import classes from "../../styles/GeneralComponents/CurrentLocation.module.css";

export default function CurrentLocation({ locationArray }) {
  const completePath = locationArray.reduce((clubedEle, ele) => {
    if (clubedEle === "") return `<span>${ele}</span>`;
    return `${clubedEle} <span>/ ${ele}</span>`;
  }, "");
  return (
    <div className={classes["current-location"]}>
      <p
        className={classes["complete-path"]}
        dangerouslySetInnerHTML={{ __html: completePath }}
      />
    </div>
  );
}
