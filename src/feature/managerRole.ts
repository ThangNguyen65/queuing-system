import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { RootState } from "../store";

export interface managerRole {
  id: string;
  NameManagerRole: string;
  NumberUser: number;
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
        docData.NumberUser &&
        docData.DescribeManagerRole
      ) {
        DataList.push({
          id: doc.id,
          NameManagerRole: docData.NameManagerRole,
          NumberUser: docData.NumberUser,
          DescribeManagerRole: docData.DescribeManagerRole,
        });
      }
    });
    return DataList;
  }
);

const dataManagerRole = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataManagerRole.fulfilled, (state, action) => {
      state.dataMgRl = action.payload;
    });
  },
});
export default dataManagerRole.reducer;
export const selectData = (state: RootState) => state.dataMgRl.dataMgRl;
export const selectLoading = (state: RootState) => state.dataMgRl.loading;
export const selectError = (state: RootState) => state.dataMgRl.error;
