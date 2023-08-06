import managerRole from "./feature/manager/role/managerRole";
import managerUser from "./feature/manager/user/userManager";
import { configureStore } from "@reduxjs/toolkit";
import device from "./feature/device/actionDevice";
import service from "./feature/service/service";
import levelNumber from "./feature/levelNo/levelNumber";
import loginReducer from "./feature/auth/login";
export const store = configureStore({
  reducer: {
    data: device,
    dataSv: service,
    dataLvNB: levelNumber,
    dataMgRl: managerRole,
    dataMgUs: managerUser,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
