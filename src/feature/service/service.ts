import { db } from "../../firebase/firebase";
import { RootState } from "../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface services {
  id: string;
  IdService: string;
  NameService: string;
  DescribeService: string;
  StatusActive: string;
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
        docData.StatusActive
      ) {
        const newItem: services = {
          id: doc.id,
          IdService: docData.IdService,
          NameService: docData.NameService,
          DescribeService: docData.DescribeService,
          StatusActive: docData.StatusActive,
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
const ServiceSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataService.fulfilled, (state, action) => {
      const newData = action.payload.filter((newItem) => {
        return !state.dataSv.some(
          (existingItem) => existingItem.id === newItem.id
        );
      });
      state.dataSv = [...state.dataSv, ...newData];
      state.loading = false;
      state.error = null;
    });
  },
});
export default ServiceSlice.reducer;

export const selectData = (state: RootState) => state.dataSv.dataSv;
export const selectLoading = (state: RootState) => state.dataSv.loading;
export const selectError = (state: RootState) => state.dataSv.error;
