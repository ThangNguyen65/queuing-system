import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/actionLogin";
import device from "./feature/actionDevice";
import service from "./feature/service";
import levelNumber from "./feature/levelNumber";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    data: device,
    dataSv: service,
    dataLvNB: levelNumber,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
