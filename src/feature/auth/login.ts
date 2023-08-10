import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";

export interface User {
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
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});
export const { loginSuccess, logoutSuccess } = loginSlice.actions;
export const saveUserDataToFirestore =
  (user: User) => async (dispatch: any) => {
    try {
      await db.collection("users").doc(user.id).set(user);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin người dùng vào Firestore:", error);
    }
  };
export default loginSlice.reducer;
