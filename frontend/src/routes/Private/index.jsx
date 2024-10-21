import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

const isAuths = () => {
  const user = sessionStorage.getItem("authUser");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = (props) => {
  // const { isAuth } = useSelector((state) => state?.login);
  const auths = isAuths();
  // console.log("isAuth", isAuth);
  return auths ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;