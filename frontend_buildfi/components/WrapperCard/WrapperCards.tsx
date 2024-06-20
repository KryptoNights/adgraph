import React from "react";
import styles from "./cards.module.css";
import data from "../../constant/constant";
import Card from "./Card";

const WrapperCards = ({
  data,
  handleClick,
}: {
  data: any;
  handleClick: any;
}) => {
  // console.log("wrapper", handleClick);

  return (
    <div className={styles.container}>
      {data.map((item: any, index: number) => (
        <Card item={item} key={index} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default WrapperCards;
