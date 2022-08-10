import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../";
import { MainLayout } from "../../layouts";

const PrivateRoute = ({ component: RouteComponent }) => {
  const { currentUser } = useContext(AuthContext);

  //   if (!currentUser && !localStorage.getItem("token")) {
  //     return <Navigate to="/login" />;
  //   }

  return (
    <MainLayout>
      <RouteComponent />
    </MainLayout>
  );
};

export default PrivateRoute;
