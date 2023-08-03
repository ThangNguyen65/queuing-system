// ../../app/selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Create the 'selectLogin' selector to get the login state from the RootState
const selectLogin = (state: RootState) => state.login;

// Define the 'selectCurrentUser' selector using 'createSelector'
export const selectCurrentUser = createSelector(
  selectLogin,
  (login) => login.currentUser
);
