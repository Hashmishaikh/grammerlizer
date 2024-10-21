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

const PublicRoute = (props) => {
//   const { isAuth } = useSelector((state) => state?.login);
  // console.log("isAUth",isAuth)
const auths = isAuths();
  return auths ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;