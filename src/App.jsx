import Card from "./components/Card/Card";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import CardContextProvider from "./store/card-store";
const App = () => {
  return (
    <CardContextProvider>
      <div className={styles.div}>
        <Form />
        <Card />
      </div>
    </CardContextProvider>
  );
};

export default App;
