import styles from "./App.module.scss";
import { CurrentContextProvider } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, UploadArticle } from "./pages";
import { MainLayout } from "./layouts";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <CurrentContextProvider>
      <div className={styles.container}>
        <SnackbarProvider>
          <Router basename="/">
            <Routes>
              <Route path="/" element={<MainLayout component={Home} />} />
            </Routes>
            <Routes>
              <Route
                path="/upload-article"
                element={<MainLayout component={UploadArticle} />}
              />
            </Routes>
          </Router>
        </SnackbarProvider>
      </div>
    </CurrentContextProvider>
  );
}

export default App;
