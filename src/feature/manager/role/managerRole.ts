import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../../store";
import { db } from "../../../firebase/firebase";

export interface managerRole {
  id: string;
  NameManagerRole: string;
  DescribeManagerRole: string;
}
interface ManagerRoleState {
  dataMgRl: managerRole[];
  loading: boolean;
  error: string | null;
}
const initialState: ManagerRoleState = {
  dataMgRl: [],
  loading: false,
  error: null,
};

export const fetchDataManagerRole = createAsyncThunk(
  "data/fetchDataManagerRole",
  async () => {
    const querySnapshot = await db.collection("managerRole").get();
    const DataList: managerRole[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.NameManagerRole &&
        docData.DescribeManagerRole 
      ) {
        DataList.push({
          id: doc.id,
          NameManagerRole: docData.NameManagerRole,
          DescribeManagerRole: docData.DescribeManagerRole,
        });
      }
    });
    return DataList;
  }
);
export const addManagerRole = createAsyncThunk(
  "AddData/addManagerRole",
  async (managerRoles: managerRole, thunkAPI) => {
    try {
      const newManagerUser: managerRole = {
        ...managerRoles,
      };
      const docRef = await db.collection("managerRole").add(newManagerUser);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateManagerRole = createAsyncThunk(
  "data/updateManagerRole",
  async (deviceData: managerRole) => {
    try {
      const updatedManagerUserData = {
        ...deviceData,
      };
      await db
        .collection("managerRole")
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
      .addCase(fetchDataManagerRole.fulfilled, (state, action) => {
        state.dataMgRl = action.payload;
      })
      .addCase(addManagerRole.fulfilled, (state, action) => {
        const id = action.payload;
        state.dataMgRl = state.dataMgRl.map((item) =>
          item.id === id ? { ...item, id } : item
        );
        state.loading = false;
        state.error = null;
      }).addCase(updateManagerRole.fulfilled, (state, action) => {
        const updatedDevice = action.payload;
        state.dataMgRl = state.dataMgRl.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        );
      });
  },
});
export default dataManagerRole.reducer;
export const selectDataMgRl = (state: RootState) => state.dataMgRl.dataMgRl;
export const selectLoading = (state: RootState) => state.dataMgRl.loading;
export const selectError = (state: RootState) => state.dataMgRl.error;
