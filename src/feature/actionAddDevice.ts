import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { RootState } from "../store";

export interface AddDevice {
  id: string;
  idDevice: string;
  nameDevice: string;
  addressIp: string;
  username: string;
  password: string;
  statusActive: string;
  statusConnect: string;
  serviceUsed: string;
  categoryDevice: string;
}
interface addDeviceState {
  data: AddDevice[];
  loading: boolean;
  error: string | null;
}
const initialState: addDeviceState = {
  data: [],
  loading: false,
  error: null,
};
export const addDevices = createAsyncThunk(
  "AddData/addDevice",
  async (device: AddDevice, thunkAPI) => {
    try {
      // Thêm trạng thái mặc định cho statusActive và statusConnect
      const newDevice: AddDevice = {
        ...device,
        statusActive: "Hoạt động", // Trạng thái mặc định là "Hoạt động"
        statusConnect: "Kết nối", // Trạng thái mặc định là "Kết nối"
      };

      const docRef = await db.collection("device").add(newDevice);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const dataDevice = createSlice({
  name: "AddData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDevices.fulfilled, (state, action) => {
      const id = action.payload;
      state.data = state.data.map((item) =>
        item.id === id ? { ...item, id } : item
      );
      state.loading = false;
      state.error = null;
    });
  },
});
export default dataDevice.reducer;

export const selectData = (state: RootState) => state.data.data;
export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
