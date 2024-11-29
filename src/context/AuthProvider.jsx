import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/userSlice";
import apiClient from "../utils/apiClient";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await apiClient.get("user/check-token");
        if (response.status === 200) {
          dispatch(loginSuccess(response.data));
        }
      } catch (error) {}
    };

    checkAuthentication();
  }, [dispatch]);

  return <>{children}</>;
};
