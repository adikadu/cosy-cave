import classes from "../../styles/HomeComponents/Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={classes["newsletter"]}>
      <h3>Join our newsletter and get 20% off</h3>
      <div className={classes["newsletter-content"]}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,
          quidem totam! Aut totam quo eos illo natus labore ipsam aliquam
          consectetur voluptatem omnis assumenda repellendus corporis rerum,
          pariatur, architecto ut
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes["newsletter-subcribe-form"]}
        >
          <input type="text" placeholder="Enter Email" />
          <button>Subscribe</button>
        </form>
      </div>
    </section>
  );
}
