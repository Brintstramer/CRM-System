import React from "react";
import classes from "./Promo.module.css";
import profileImg from "../../assets/promoImg.svg";

const Promo: React.FC = () => {
  return (
    <div className={classes.promo}>
      <img className={classes.img} src={profileImg} alt="Turn your ideas into reality." />
      <div className={classes.slogan}>
        <h2>Turn your ideas into reality.</h2>
        <p>Start for free and get attractive offers from the community</p>
      </div>
    </div>
  );
};

export default Promo;
