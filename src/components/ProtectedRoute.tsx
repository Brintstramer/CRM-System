import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/auth-slice";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useSelector(selectAccessToken);

  const protect = accessToken ? children : <Navigate to="/profile" replace />;

  return protect;
};

export default ProtectedRoute;
