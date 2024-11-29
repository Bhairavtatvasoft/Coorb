import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? component : <Navigate to="/" />;
};

export default PrivateRoute;
