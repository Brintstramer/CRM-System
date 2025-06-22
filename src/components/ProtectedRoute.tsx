import React from "react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// import { getUserData } from "../store/thunks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {


  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  // const dispatch = useDispatch<AppDispatch>();

  // if (accessToken) {
  //   try {
  //     dispatch(getUserData()).unwrap();
  //     return children;
  //   } catch {
  //     return <Navigate to="/profile" replace />;
  //   }
  // }

  return accessToken ? children : <Navigate to="/profile" replace />;
};

export default ProtectedRoute;
