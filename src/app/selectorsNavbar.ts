import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectNameUser = createSelector(
  (state: RootState) => state.login.currentUser,
  (currentUser) => currentUser?.NameUser || ""
);
