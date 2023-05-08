// importing dependecis
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const user = localStorage.getItem("user");

  // return <Outlet/>

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminPrivateRoute;