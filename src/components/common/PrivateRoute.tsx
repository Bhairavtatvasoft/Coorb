import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../../utils/helper";

interface PrivateRouteProps {
  component: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const isAuthenticated = getAuthToken() ? true : false;

  return isAuthenticated ? component : <Navigate to="/" />;
};

export default PrivateRoute;
