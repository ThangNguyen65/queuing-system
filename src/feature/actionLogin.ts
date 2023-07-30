import { createSlice } from "@reduxjs/toolkit";
import { User } from "../model/User";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface LoginState {
  user: null | User;
}

const initialState: LoginState = {
  user: null,
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
