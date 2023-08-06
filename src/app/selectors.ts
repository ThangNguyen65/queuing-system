import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectLogin = (state: RootState) => state.login;

export const selectCurrentUser = createSelector(
  selectLogin,
  (login) => login.currentUser
);
