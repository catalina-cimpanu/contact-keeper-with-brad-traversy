import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;

// NOTE: setAuthToken function adds a default header to the axios and in every request after initial run of the setAuthToken, token is sent to the server by axios and checked by the auth middleware on the backend.
// to understand the axios headers: https://www.codota.com/code/javascript/functions/axios/AxiosRequestConfig/headers and https://stackoverflow.com/questions/46656474/axios-remove-headers-authorization-in-1-call-only
