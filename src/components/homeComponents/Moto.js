import classes from "../../styles/HomeComponents/Moto.module.css";
import Card from "../generalComponents/Card";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

export default function Moto() {
  return (
    <section className={classes["moto"]}>
      <div className={classes["moto-text"]}>
        <h3>
          Custom Furniture
          <br />
          Built Only For You
        </h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
          corrupti distinctio eos incidunt. Accusamus laborum explicabo sapiente
          numquam consequatur error fugiat earum, placeat at necessitatibus.
        </p>
      </div>
      <div className={classes["cards"]}>
        <Card
          keyword="Mission"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit unde animi beatae obcaecati est. Illo exercitationem odit distinctio quo rerum?"
        >
          <GiCompass />
        </Card>
        <Card
          keyword="Vision"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit unde animi beatae obcaecati est. Illo exercitationem odit distinctio quo rerum?"
        >
          <GiDiamondHard />
        </Card>
        <Card
          keyword="History"
          desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit unde animi beatae obcaecati est. Illo exercitationem odit distinctio quo rerum?"
        >
          <GiStabbedNote />
        </Card>
      </div>
    </section>
  );
}
