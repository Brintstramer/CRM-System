import React from "react";
import classes from "./Promo.module.css";
import profileImg from "../../assets/promoImg.svg";

const Promo: React.FC = () => {
  return (
    <div className={classes.promo}>
      <img
        className={classes.img}
        src={profileImg}
        alt="Turn your ideas into reality."
      />
      <div className={classes.slogan}>
        <h2>Воплотите ваши идеи в реальность</h2>
        <p>Начните получать привлекательные оферы с нашим сообществом</p>
      </div>
    </div>
  );
};

export default Promo;
