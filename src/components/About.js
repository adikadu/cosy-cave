import classes from "../styles/About.module.css";
import CurrentLocation from "./generalComponents/CurrentLocation";
import heroBcg1 from "../images/hero-bcg.jpeg";

export default function About() {
  return (
    <section className={classes["about"]}>
      <CurrentLocation locationArray={["home", "about"]} />
      <div className={classes["about-content"]}>
        <img src={heroBcg1} alt="about page" />
        <div className={classes["about-content-text"]}>
          <h2>our story </h2>
          <hr />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            quidem quo quos ducimus magnam, officia qui quae deleniti quaerat
            dolor, expedita libero beatae quasi aut. Nulla consequuntur, nobis
            libero fugit dignissimos mollitia architecto delectus id quae
            accusamus in impedit suscipit? Nesciunt iure voluptates dolor
            aspernatur eaque enim fugit reiciendis laudantium porro dicta
            distinctio placeat consequatur fugiat, cupiditate iusto! Tempore
            eaque quo esse neque odio reprehenderit consequuntur cupiditate ab
            nihil dolorem eos nemo reiciendis iste est aliquam ratione, ullam
            inventore quos.
          </p>
        </div>
      </div>
    </section>
  );
}
