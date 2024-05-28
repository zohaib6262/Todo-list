import React, { useContext } from "react";
import styles from "./Card.module.css";
import { CardContext } from "../../store/card-store";
const Card = () => {
  console.log("Card");
  const { items, onRemoveHandle, onAllClearHandle } = useContext(CardContext);
  // console.log(items);

  const removeHandler = (id) => {
    const filtered_List = items.filter((value) => value.id !== id);
    onRemoveHandle(filtered_List);
  };
  return (
    <>
      {items.map((value, index) => {
        return (
          <div className={styles.card} key={index}>
            {`Name:${value.name} and Age:${value.age}`}
            <button
              className={styles.btn}
              onClick={() => removeHandler(value.id)}
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        className={`${styles.btn} ${styles.clear}`}
        onClick={() => onAllClearHandle()}
      >
        Clear
      </button>
    </>
  );
};

export default Card;
