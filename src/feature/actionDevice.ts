import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";

interface Device {
  id: string;
  idDevice: string;
  nameDevice: string;
  addressIp: string;
  statusActive: string;
  statusConnect: string;
  serviceUsed: string;
}
interface DeviceState {
  data: Device[];
  loading: boolean;
  error: string | null;
}
const initialState: DeviceState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const querySnapshot = await db.collection("device").get();
  const Datalist: Device[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (
      data.idDevice &&
      data.nameDevice &&
      data.statusActive &&
      data.addressIp &&
      data.statusConnect &&
      data.serviceUsed
    ) {
      Datalist.push({
        id: doc.id,
        idDevice: data.idDevice,
        nameDevice: data.nameDevice,
        statusActive: data.statusActive,
        addressIp: data.addressIp,
        statusConnect: data.statusConnect,
        serviceUsed: data.serviceUsed,
      });
    }
  });
  return Datalist;
});
const device = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Loi roi dit con me may";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default device.reducer;
export const selectData = (state: RootState) => state.data.data;
export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
