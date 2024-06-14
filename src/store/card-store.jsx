import { createContext, useState, useEffect } from "react";
import { AVAILABLE_LIST } from "../data.js";

export const CardContext = createContext({
  onSearchHandle: () => {},
  searchItems: [],
  items: [],
  onAddHandle: () => {},
  onRemoveHandle: () => {},
  onAllClearHandle: () => {},
});

export default function CardContextProvider({ children }) {
  const storedItems = JSON.parse(localStorage.getItem("item")) || [];
  const [todoList, setTodoList] = useState([]);
  const [allSearchItems, setAllSearchItems] = useState([]);

  useEffect(() => {
    // Merge stored items and AVAILABLE_LIST and ensure uniqueness
    const allItems = [...storedItems, ...AVAILABLE_LIST];
    const uniqueItemsSet = new Set(
      allItems.map((value) => JSON.stringify(value))
    );
    const uniqueItemsArray = Array.from(uniqueItemsSet).map(JSON.parse);
    setTodoList(uniqueItemsArray);
  }, []);

  const clearHandler = () => {
    localStorage.removeItem("item");
    setTodoList([]);
  };

  const removeHandler = (data) => {
    localStorage.setItem("item", JSON.stringify(data));
    setTodoList(data);
  };

  const addHandler = (data) => {
    setTodoList((preTodoList) => {
      const newTodoList = [data, ...preTodoList];
      localStorage.setItem("item", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };
  const searchHandler = (searchItem) => {
    if (searchItem.length === 0) {
      setAllSearchItems([]);
    } else {
      const uniqueSearchItems = [
        ...new Set(searchItem.map((item) => JSON.stringify(item))),
      ].map(JSON.parse);
      setAllSearchItems(uniqueSearchItems);
    }
  };

  // const searchHandler = (searchItem) => {
  //   if (searchItem.length === 0) {
  //     setAllSearchItems([]);
  //   } else {
  //     console.log("SearchItems", searchItem);
  //     const uniqueSearchItems = [
  //       ...new Set(
  //         allSearchItems
  //           .concat([searchItem])
  //           .map((item) => JSON.stringify(item))
  //       ),
  //     ].map(JSON.parse);
  //     setAllSearchItems(uniqueSearchItems);
  //   }
  // };

  const ctxValue = {
    onSearchHandle: searchHandler,
    searchItems: allSearchItems,
    items: todoList,
    onAddHandle: addHandler,
    onRemoveHandle: removeHandler,
    onAllClearHandle: clearHandler,
  };

  return (
    <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>
  );
}
