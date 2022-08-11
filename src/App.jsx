import styles from "./App.module.scss";
import {
  ArticleContextProvider,
  AuthContextProvider,
  PrivateRoute,
} from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, UploadArticle, Live, Analysis, Login } from "./pages";

import { SnackbarProvider } from "notistack";

function App() {
  return (
    <AuthContextProvider>
      <ArticleContextProvider>
        <div className={styles.container}>
          <SnackbarProvider>
            <Router basename="/">
              <Routes>
                <Route path="/login" element={<Login />} />
                {/* </Routes>
              <Routes> */}
                <Route path="/" element={<PrivateRoute component={Home} />} />
                <Route
                  path="/upload-article"
                  element={<PrivateRoute component={UploadArticle} />}
                />
                <Route
                  path="/analytics"
                  element={<PrivateRoute component={Analysis} />}
                />
                <Route
                  path="/live"
                  element={<PrivateRoute component={Live} />}
                />
              </Routes>
            </Router>
          </SnackbarProvider>
        </div>
      </ArticleContextProvider>
    </AuthContextProvider>
  );
}

export default App;
