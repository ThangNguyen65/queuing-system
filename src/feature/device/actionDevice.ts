import { RootState } from "../../store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";

export interface Device {
  id: string;
  idDevice: string;
  nameDevice: string;
  addressIp: string;
  statusActive: string;
  statusConnect: string;
  serviceUsed: string;
  categoryDevice: string;
  username: string;
  password: string;
}
interface DeviceState {
  data: Device[];
  loading: boolean;
  error: string | null;
  activityHistory: any[];
  
}
const initialState: DeviceState = {
  data: [],
  loading: false,
  error: null,
  activityHistory: [],
};
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const querySnapshot = await db.collection("device").get();
  const Datalist: Device[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    if (
      docData.idDevice &&
      docData.nameDevice &&
      docData.statusActive &&
      docData.addressIp &&
      docData.statusConnect &&
      docData.serviceUsed &&
      docData.categoryDevice &&
      docData.username &&
      docData.password
    ) {
      const newItem: Device = {
        id: doc.id,
        idDevice: docData.idDevice,
        nameDevice: docData.nameDevice,
        statusActive: docData.statusActive,
        addressIp: docData.addressIp,
        statusConnect: docData.statusConnect,
        serviceUsed: docData.serviceUsed,
        categoryDevice: docData.categoryDevice,
        username: docData.username,
        password: docData.password,
      };
      const existingItem = Datalist.find((item) => item.id === newItem.id);
      if (!existingItem) {
        Datalist.push(newItem);
      }
    }
  });
  return Datalist;
});

export const updateDevice = createAsyncThunk(
  "data/updateDevice",
  async (deviceData: Device) => {
    try {
      const updatedDeviceData = {
        ...deviceData,
        statusActive: "Hoạt động",
        statusConnect: "Kết nối",
      };

      await db
        .collection("device")
        .doc(updatedDeviceData.id)
        .update(updatedDeviceData);
      return updatedDeviceData;
    } catch (error) {
      throw error;
    }
  }
);

const device = createSlice({
  name: "data",
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<any>) => {
      state.activityHistory.push(action.payload);
    },
  },
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
        const newData = action.payload.filter((newItem) => {
          return !state.data.some(
            (existingItem) => existingItem.id === newItem.id
          );
        });

        state.data = [...state.data, ...newData];
        state.loading = false;
        state.error = null;
      })
      //
      .addCase(updateDevice.fulfilled, (state, action) => {
        const updatedDevice = action.payload;
        state.data = state.data.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        );
      });
  },
});

export default device.reducer;
export const selectData = (state: RootState) => state.data.data;
export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
export const selectActivityHistory = (state: RootState) =>
  state.data.activityHistory;
export const { addActivity } = device.actions;
