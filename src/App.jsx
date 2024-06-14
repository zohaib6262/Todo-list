import Card from "./components/Card/Card";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import CardContextProvider from "./store/card-store";
import Search from "./components/Search/Search";
const App = () => {
  return (
    <CardContextProvider>
      <div className={styles.div}>
        <Search />
        <Form />
        <Card />
      </div>
    </CardContextProvider>
  );
};

export default App;
