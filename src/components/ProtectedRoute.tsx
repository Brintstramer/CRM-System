import React from "react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Notifications from "./Notifications";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth, isAuthChecked } = useSelector((state: RootState) => state.auth);

  if (!isAuthChecked) {
    return <Notifications />;
  }

  return isAuth ? children : <Navigate to="/authorization" replace />;
};

export default ProtectedRoute;
