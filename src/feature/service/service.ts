import { db } from "../../firebase/firebase";
import { RootState } from "../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface services {
  id: string;
  IdService: string;
  NameService: string;
  DescribeService: string;
  StatusActive: string;
  suffix: string;
  limit: string;
  StatusDescribe: string;
}
interface ServiceState {
  dataSv: services[];
  loading: boolean;
  error: string | null;
}
const initialState: ServiceState = {
  dataSv: [],
  loading: false,
  error: null,
};
export const fetchDataService = createAsyncThunk(
  "data/fetchDataService",
  async () => {
    const querySnapshot = await db.collection("service").get();
    const Datalist: services[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.IdService &&
        docData.NameService &&
        docData.DescribeService &&
        docData.StatusActive &&
        docData.suffix &&
        docData.limit &&
        docData.StatusDescribe
      ) {
        const newItem: services = {
          id: doc.id,
          IdService: docData.IdService,
          NameService: docData.NameService,
          DescribeService: docData.DescribeService,
          StatusActive: docData.StatusActive,
          suffix: docData.suffix,
          limit: docData.limit,
          StatusDescribe: docData.StatusDescribe,
        };
        const existingItem = Datalist.find((item) => item.id === newItem.id);
        if (!existingItem) {
          Datalist.push(newItem);
        }
      }
    });
    return Datalist;
  }
);

export const updateService = createAsyncThunk(
  "data/updateService",
  async (deviceData: services) => {
    try {
      const updatedDeviceData = {
        ...deviceData,
      };

      await db
        .collection("service")
        .doc(updatedDeviceData.id)
        .update(updatedDeviceData);
      return updatedDeviceData;
    } catch (error) {
      throw error;
    }
  }
);

const ServiceSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataService.fulfilled, (state, action) => {
        const newData = action.payload.filter((newItem) => {
          return !state.dataSv.some(
            (existingItem) => existingItem.id === newItem.id
          );
        });
        state.dataSv = [...state.dataSv, ...newData];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const updatedDevice = action.payload;
        state.dataSv = state.dataSv.map((device) =>
          device.id === updatedDevice.id ? updatedDevice : device
        );
      });
  },
});
export default ServiceSlice.reducer;

export const selectDataSV = (state: RootState) => state.dataSv.dataSv;
export const selectLoading = (state: RootState) => state.dataSv.loading;
export const selectError = (state: RootState) => state.dataSv.error;
