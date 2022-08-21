import styles from "./App.module.scss";
import {
  ArticleContextProvider,
  AuthContextProvider,
  PrivateRoute,
} from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  UploadArticle,
  ManageArticle,
  AddLive,
  ManageLive,
  Analysis,
  Login,
  SingleArticle,
  NotFound,
} from "./pages";

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

                <Route path="articles">
                  <Route
                    path=":id"
                    element={<PrivateRoute component={SingleArticle} />}
                  />
                  <Route
                    path="manage"
                    element={<PrivateRoute component={ManageArticle} />}
                  />
                  <Route
                    path="upload"
                    element={<PrivateRoute component={UploadArticle} />}
                  />
                </Route>
                <Route path="livestream">
                  <Route
                    path="add"
                    element={<PrivateRoute component={AddLive} />}
                  />
                  <Route
                    path="manage"
                    element={<PrivateRoute component={ManageLive} />}
                  />
                </Route>
                <Route
                  path="/analytics"
                  element={<PrivateRoute component={Analysis} />}
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
