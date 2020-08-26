import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Harry Potter",
        email: "harry@email.com",
        phone: "111-222-333",
        type: "personal",
      },
      {
        id: 2,
        name: "Mary Poppins",
        email: "mary@email.com",
        phone: "222-222-222",
        type: "professional",
      },
      {
        id: 3,
        name: "Peter Pan",
        email: "peter@email.com",
        phone: "999-999-999",
        type: "professional",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid.v4;
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  //Delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // Set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // Clear current contact
  const clearCurrent = (contact) => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //Update contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  // Filter contacts

  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
