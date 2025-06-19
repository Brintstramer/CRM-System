import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken ? children : <Navigate to="/profile" replace />;
};

export default ProtectedRoute;
