import styles from "./App.module.scss";
import { CurrentContextProvider } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { MainLayout } from "./Layout";

function App() {
  return (
    <CurrentContextProvider>
      <div className={styles.container}>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<MainLayout component={Home} />} />
          </Routes>
        </Router>
      </div>
    </CurrentContextProvider>
  );
}

export default App;
