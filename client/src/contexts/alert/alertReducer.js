import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]; // cuz there's only this array in the state (but normally we return the updated/modified state)
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default AlertReducer;
