import React from "react";
import { Navigate, Route, RouterProps } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  loading: boolean;
  isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  loading,
  isLoggedIn,
}) => {
  if (loading) return <div>...Loading</div>;
  console.log(isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
