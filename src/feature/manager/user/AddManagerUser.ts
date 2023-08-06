import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/firebase";
import { RootState } from "../../../store";

export interface AddManagerUser {
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
interface AddManagerUserState {
  dataMgUs: AddManagerUser[];
  loading: boolean;
  error: string | null;
}
const initialState: AddManagerUserState = {
  dataMgUs: [],
  loading: false,
  error: null,
};
export const addManagerUser = createAsyncThunk(
  "AddData/addManagerUser",
  async (device: AddManagerUser, thunkAPI) => {
    try {
      const newManagerUser: AddManagerUser = {
        ...device,
      };
      const docRef = await db.collection("managerUser").add(newManagerUser);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const dataMangerUser = createSlice({
  name: "AddData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addManagerUser.fulfilled, (state, action) => {
      const id = action.payload;
      state.dataMgUs = state.dataMgUs.map((item) =>
        item.id === id ? { ...item, id } : item
      );
      state.loading = false;
      state.error = null;
    });
  },
});
export default dataMangerUser.reducer;

export const selectData = (state: RootState) => state.dataMgUs.dataMgUs;
export const selectLoading = (state: RootState) => state.dataMgUs.loading;
export const selectError = (state: RootState) => state.dataMgUs.error;
