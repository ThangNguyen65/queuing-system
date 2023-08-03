import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
 id: string;
  UserNameManagerUser: string;
  NameUser: string;
  Phone: number;
  Email: string;
  Role: string;
  StatusActive: string;
  password: string;
  conformPassword: string;
}

interface LoginState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: LoginState = {
  isAuthenticated: false,
  currentUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
