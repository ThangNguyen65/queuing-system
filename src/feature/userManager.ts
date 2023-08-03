import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { RootState } from "../store";

export interface ManagerUser {
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
interface ManagerRoleState {
  dataMgUs: ManagerUser[];
  loading: boolean;
  error: string | null;
}
const initialState: ManagerRoleState = {
  dataMgUs: [],
  loading: false,
  error: null,
};

export const fetchDataManagerUser = createAsyncThunk(
  "data/fetchDataManagerUser",
  async () => {
    const querySnapshot = await db.collection("managerUser").get();
    const DataList: ManagerUser[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.UserNameManagerUser &&
        docData.NameUser &&
        docData.Phone &&
        docData.Email &&
        docData.Role &&
        docData.password &&
        docData.conformPassword &&
        docData.StatusActive
      ) {
        const newItem: ManagerUser = {
          id: doc.id,
          UserNameManagerUser: docData.UserNameManagerUser,
          NameUser: docData.NameUser,
          Phone: docData.Phone,
          Email: docData.Email,
          Role: docData.Role,
          StatusActive: docData.StatusActive,
          password: docData.password,
          conformPassword: docData.conformPassword,
        };
        const existingItem = DataList.find((item) => item.id === newItem.id);
        if (!existingItem) {
          DataList.push(newItem);
        }
      }
    });
    return DataList;
  }
);
export const updateManagerUser = createAsyncThunk(
  "data/updateManagerUser",
  async (deviceData: ManagerUser) => {
    try {
      const updatedManagerUserData = {
        ...deviceData,
      };
      await db
        .collection("managerUser")
        .doc(updatedManagerUserData.id)
        .update(updatedManagerUserData);
      return updatedManagerUserData;
    } catch (error) {
      throw error;
    }
  }
);

const dataManagerRole = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataManagerUser.fulfilled, (state, action) => {
         // Kiểm tra xem dữ liệu mới đã tồn tại trong state hay chưa
         const newData = action.payload.filter((newItem) => {
          return !state.dataMgUs.some(
            (existingItem) => existingItem.id === newItem.id
          );
        });

        // Thêm dữ liệu mới vào state
        state.dataMgUs = [...state.dataMgUs, ...newData];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateManagerUser.fulfilled, (state, action) => {
        const updatedDevice = action.payload;
        state.dataMgUs = state.dataMgUs.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        );
      });
  },
});

export default dataManagerRole.reducer;
export const selectData = (state: RootState) => state.dataMgUs.dataMgUs;
export const selectLoading = (state: RootState) => state.dataMgUs.loading;
export const selectError = (state: RootState) => state.dataMgUs.error;
