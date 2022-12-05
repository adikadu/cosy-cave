import classes from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import heroBcg1 from "../images/hero-bcg.jpeg";
import heroBcg2 from "../images/hero-bcg-2.jpeg";
import FeatureProducts from "./homeComponents/FeatureProducts";
import Moto from "./homeComponents/Moto";
import Newsletter from "./homeComponents/Newsletter";

export default function Home() {
  return (
    <section className={classes["home"]}>
      <section className={classes["hero"]}>
        <div className={classes["hero-text"]}>
          <h1>
            Design Your
            <br />
            Comfort Zone
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
            consequatur nam quisquam, excepturi commodi quaerat iure sed nihil
            fugit aliquam eligendi inventore quos reiciendis tenetur at,
            obcaecati cumque laboriosam maxime.
          </p>
          <Link to="products">Shop Now</Link>
        </div>
        <div className={classes["hero-images"]}>
          <img
            className={classes["hero-img-1"]}
            src={heroBcg1}
            alt="hero background 1"
          />
          <img
            className={classes["hero-img-2"]}
            src={heroBcg2}
            alt="hero background 2"
          />
        </div>
      </section>
      <FeatureProducts />
      <Moto />
      <Newsletter />
    </section>
  );
}
