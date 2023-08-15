// activitySlice.ts (hoặc tạo một file tương tự)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase/firebase";
import { RootState } from "../../../store";

export interface Activity {
  id: string;
  userName: string;
  action: string;
  // serviceName: string;
  deviceAddress: string;
  levelNumberGrantTime: string;
}

interface ActivityState {
  dataNote: Activity[];
}

const initialState: ActivityState = {
  dataNote: [],
};
export const addActivity = createAsyncThunk(
  "data/addActivity",
  async (device: Activity, thunkAPI) => {
    try {
      const newDevice: Activity = {
        ...device,
      };
      const docRef = await db.collection("ManagerNote").add(newDevice);
      const id = docRef.id;
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const DataActivity = createAsyncThunk("data/DataActivity", async () => {
  const querySnapshot = await db.collection("ManagerNote").get();
  const Datalist: Activity[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    if (
      docData.userName &&
      docData.action &&
      // docData.serviceName &&
      docData.deviceAddress &&
      docData.levelNumberGrantTime
    ) {
      Datalist.push({
        id: doc.id,
        userName: docData.userName,
        action: docData.action,
        // serviceName: docData.serviceName,
        deviceAddress: docData.deviceAddress,
        levelNumberGrantTime: docData.levelNumberGrantTime,
      });
    }
  });
  return Datalist;
});

const activitySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addActivity.fulfilled, (state, action) => {
        const id = action.payload;
        state.dataNote = state.dataNote.map((item) =>
          item.id === id ? { ...item, id } : item
        );
      })
      .addCase(DataActivity.fulfilled, (state, action) => {
        state.dataNote = action.payload;
        console.log("Fetched activity data:", action.payload);
      });
  },
});

export default activitySlice.reducer;
export const selectDataActivity = (state: RootState) => state.dataNote.dataNote;
