import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { RootState } from "../store";

export interface LevelNumber {
  id: string;
  IdLevelNum: string;
  NameCustomer: string;
  NameServices: string;
  GrantTime: Date;
  Expiry: Date;
  Status: string;
  PowerSupply: string;
}
interface LevelNumberState {
  dataLvNB: LevelNumber[];
  loading: boolean;
  error: string | null;
}
const initialState: LevelNumberState = {
  dataLvNB: [],
  loading: false,
  error: null,
};
export const FetchDataLevelNumber = createAsyncThunk(
  "data/FetchDataLevelNumber",
  async () => {
    const querySnapshot = await db.collection("levelNumber").get();
    const DataList: LevelNumber[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.IdLevelNum &&
        docData.NameCustomer &&
        docData.NameServices &&
        docData.GrantTime &&
        docData.Expiry &&
        docData.Status &&
        docData.PowerSupply
      ) {
        const newItem: LevelNumber = {
          id: doc.id,
          IdLevelNum: docData.IdLevelNum,
          NameCustomer: docData.NameCustomer,
          NameServices: docData.NameServices,
          GrantTime: docData.GrantTime,
          Expiry: docData.Expiry,
          Status: docData.Status,
          PowerSupply: docData.PowerSupply,
        };
        const ItemLevelNumber = DataList.find((item) => item.id === newItem.id);
        if (!ItemLevelNumber) {
          DataList.push(newItem);
        }
      }
    });
    return DataList;
  }
);

const DataLevelNumber = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchDataLevelNumber.fulfilled, (state, action) => {
      const newData = action.payload.filter((newItem) => {
        const newData = action.payload.filter((newItem) => {
          return !state.dataLvNB.some(
            (ItemLevelNumber) => ItemLevelNumber.id === newItem.id
          );
        });
        state.dataLvNB = [...state.dataLvNB, ...newData];
        state.loading = false;
        state.error = null;
      });
    });
  },
});
export default DataLevelNumber.reducer;

export const selectData = (state: RootState) => state.dataLvNB.dataLvNB;
export const selectLoading = (state: RootState) => state.dataLvNB.loading;
export const selectError = (state: RootState) => state.dataLvNB.error;
