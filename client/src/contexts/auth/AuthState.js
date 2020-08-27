import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
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
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user = get the user data from the backend and put it into our state, so that we can validate our authentication, so that we can access certain areas
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token); // we only have a token in localStorage if the registration or login were successful
    }

    try {
      const res = await axios.get("/api/auth"); // cuz we have proxy, basically it will return the user object (minus the password), as res.data

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register user  (formData is basically : name, email, password)
  const register = async (formData) => {
    const config = {
      headers: { "Content-type": "application/json" },
    };

    // axios.post(url[, data[, config]]) , config has several options, one of which is headers, from https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index , see also  https://github.com/axios/axios
    try {
      const res = await axios.post("/api/users", formData, config); //normally http://localhost:5000/api/users, but we have "proxy": "http://localhost:5000" in package.json

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // res.data will be the token sent by the server, after all the verification in the users route (what we did at the beginning)
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg, // cuz with axios, you can catch the err.response, which has data, status, headers; the data is what you sent from the backend, if you sent anything; see : https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253
      });
    }
  };

  // Log in user (get the token)
  const loginUser = async () => {
    console.log("Login user");
  };

  // Log out user (destroy token)
  const logoutUser = async () => {
    console.log("Logout user");
  };

  // Clear errors
  const clearErrors = async () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
