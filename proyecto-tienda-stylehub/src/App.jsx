import { Navbar } from "./components/Navbar/Navbar";
import { MyRoutes } from "./routes/MyRoutes";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.boxApp}>
      <Navbar />
      <MyRoutes />
    </div>
  );
}

export default App;
