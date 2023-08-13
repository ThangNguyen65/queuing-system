import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { db } from "../../firebase/firebase";

export interface LevelNumber {
  id: string;
  IdLevelNum: string;
  NameCustomer: string;
  NameServices: string;
  GrantTime: string;
  Expiry: string;
  Status: string;
  PowerSupply: string;
  PhoneLvNum: number;
  EmailLvNum: string;
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

export const addLevelNumber = createAsyncThunk(
  "AddData/addLevelNumber",
  async (service: LevelNumber, thunkAPI) => {
    try {
      const newManagerUser: LevelNumber = {
        ...service,
      };

      const docRef = await db.collection("levelNumber").add(newManagerUser);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const DataLevelNumberAdd = createSlice({
  name: "dataLvNB",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLevelNumber.fulfilled, (state, action) => {
      const id = action.payload;
      const addedData = state.dataLvNB.find((item) => item.id === id);
      if (addedData) {
        const newIdLevelNum = String(Number(addedData.IdLevelNum) + 1);
        const newData = {
          ...addedData,
          IdLevelNum: newIdLevelNum,
        };
        state.dataLvNB.push(newData);
      }

      state.loading = false;
      state.error = null;
    });
    builder.addCase(addLevelNumber.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addLevelNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default DataLevelNumberAdd.reducer;

export const selectData = (state: RootState) => state.dataLvNB.dataLvNB;
export const selectLoading = (state: RootState) => state.dataLvNB.loading;
export const selectError = (state: RootState) => state.dataLvNB.error;
