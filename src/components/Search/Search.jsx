import React, { useContext } from "react";
import { CardContext } from "../../store/card-store";
import classes from "./Search.module.css";
const Search = () => {
  const { items, onSearchHandle } = useContext(CardContext);

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      onSearchHandle([]);
    } else {
      const filteredItems = items.filter((item) => {
        let name = item.name.toUpperCase();
        let age = item.age;
        let value = e.target.value.toUpperCase();
        if (value == age || name.includes(value)) {
          return item;
        }
      });
      onSearchHandle(filteredItems);
    }
  };

  return (
    <>
      <input
        className={classes.input}
        type="text"
        placeholder="Serach any todo by name or age"
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
