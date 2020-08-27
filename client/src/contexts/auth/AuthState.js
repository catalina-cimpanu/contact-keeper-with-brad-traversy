import React, { useReducer } from "react";
// import { v4 as uuid } from "uuid";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"), // the local storage in the browser, has getItem("key"), setItem("key","value"), deleteItem("key"); see https://www.w3schools.com/jsref/prop_win_localstorage.asp
    isAuthenticated: null,
    user: null,
    loading: true,
    console: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user

  // Register user

  // Log in user (get the token)

  // Log out user (destroy token)

  // Clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
