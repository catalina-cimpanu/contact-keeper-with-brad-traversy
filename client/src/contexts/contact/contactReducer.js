import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_FILTER,
} from "../types";

const ContactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state, // i don't understand why he put the ...state here, since it only has the contacts rray... mais bon!
        contacts: [...state.contacts, action.payload],
      };
    default:
      return state;
  }
};

export default ContactReducer;
