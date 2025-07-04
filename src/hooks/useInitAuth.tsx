import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useRef } from "react";
import { logout, setAuthChecked } from "../store/auth-slice";
import { setProfileView } from "../store/ui-slice";
import { getUserData, refreshAccessToken } from "../store/thunks";

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
        dispatch(setProfileView("auth"));
        dispatch(setAuthChecked(true));
        return;
      }

      try {
        await dispatch(refreshAccessToken({ refreshToken })).unwrap();
        await dispatch(getUserData()).unwrap();
        dispatch(setProfileView("userData"));
      } catch (error) {
        dispatch(logout());
        dispatch(setProfileView("auth"));
      } finally {
        dispatch(setAuthChecked(true));
      }
    };

    initAuth();
  }, [dispatch]);
};
