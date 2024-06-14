import React, { useContext } from "react";
import styles from "./Card.module.css";
import { CardContext } from "../../store/card-store";
const Card = () => {
  const { items, searchItems, onRemoveHandle, onAllClearHandle } =
    useContext(CardContext);
  // console.log(items);

  const removeHandler = (id) => {
    const filtered_List = items.filter((value) => value.id !== id);
    onRemoveHandle(filtered_List);
  };

  let showItems = [];

  console.log("Card", searchItems);

  if (searchItems.length > 0) {
    console.log(searchItems);
    showItems = [...searchItems];
  } else {
    showItems = [...items];
  }
  return (
    <>
      {showItems.map((value, index) => {
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
