import { createContext, useState, useEffect } from "react";
import { AVAILABLE_LIST } from "../data.js";

export const CardContext = createContext({
  items: [],
  onAddHandle: () => {},
  onRemoveHandle: () => {},
  onAllClearHandle: () => {},
});

export default function CardContextProvider({ children }) {
  const storedItems = JSON.parse(localStorage.getItem("item")) || [];
  const [todoList, setTodoList] = useState([]);

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

  const ctxValue = {
    items: todoList,
    onAddHandle: addHandler,
    onRemoveHandle: removeHandler,
    onAllClearHandle: clearHandler,
  };

  return (
    <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>
  );
}
