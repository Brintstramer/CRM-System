import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useRef } from "react";
import { logout, setAuthChecked } from "../store/slices/auth-slice";
import { refreshAccessToken } from "../store/thunks/auth-thunk";

export const useInitAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const firstInit = useRef(false);

  useEffect(() => {
    if (firstInit.current) return;
    firstInit.current = true;

    const initAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        dispatch(logout());
        dispatch(setAuthChecked(true));
        return;
      }

      try {
        await dispatch(refreshAccessToken({ refreshToken })).unwrap();
      } catch (error) {
        dispatch(logout());
      } finally {
        dispatch(setAuthChecked(true));
      }
    };

    initAuth();
  }, [dispatch]);
};
