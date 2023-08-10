import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { RootState } from "../../store";

export interface AddService {
  id: string;
  IdService: string;
  NameService: string;
  DescribeService: string;
  StatusActive: string;
  suffix: string;
  limit: string;
  StatusDescribe: string;
}
interface AddServiceState {
  dataSv: AddService[];
  loading: boolean;
  error: string | null;
}
const initialState: AddServiceState = {
  dataSv: [],
  loading: false,
  error: null,
};
export const addService = createAsyncThunk(
  "AddData/addService",
  async (service: AddService, thunkAPI) => {
    try {
      const newManagerUser: AddService = {
        ...service,
      };
      const docRef = await db.collection("service").add(newManagerUser);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const dataSerivce = createSlice({
  name: "AddData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addService.fulfilled, (state, action) => {
      const id = action.payload;
      state.dataSv = state.dataSv.map((item) =>
        item.id === id ? { ...item, id } : item
      );
      state.loading = false;
      state.error = null;
    });
  },
});
export default dataSerivce.reducer;

export const selectData = (state: RootState) => state.dataSv.dataSv;
export const selectLoading = (state: RootState) => state.dataSv.loading;
export const selectError = (state: RootState) => state.dataSv.error;
