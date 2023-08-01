import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/actionLogin";
import device from "./feature/actionDevice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    data: device,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
