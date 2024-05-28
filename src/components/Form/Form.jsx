import React, { useContext, useState } from "react";
import styles from "./Form.module.css";
import { CardContext } from "../../store/card-store";
const Form = () => {
  console.log("Form");
  const { onAddHandle } = useContext(CardContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isValid, setIsValid] = useState(true);

  const nameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    if (e.target.value > 0) {
      setIsValid(true);
    }
    console.log(e.target.value);
    setAge(+e.target.value);
  };
  const submitHandle = (e) => {
    e.preventDefault();

    if (name.trim().length > 0 && age > 0) {
      const obj = { id: Math.random(), name: name.trim(), age };
      onAddHandle(obj);
    } else {
      setIsValid(false);
      return;
    }

    //Two way Binding
    setName("");
    setAge(0);
  };

  return (
    <form onSubmit={submitHandle}>
      <div className={`${styles.name} ${!isValid && styles.invalid}`}>
        <label>Name</label>
        <input value={name} type="text" onChange={nameHandler} />
      </div>

      <div className={`${styles.age} ${!isValid && styles.invalid}`}>
        <label>Age</label>
        <input value={age} type="number" min="0" onChange={ageHandler} />
      </div>

      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default Form;
