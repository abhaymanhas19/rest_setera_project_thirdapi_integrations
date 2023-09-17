import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dataConnectionState = {
  dataConnectionState: any;
};

const initialState: dataConnectionState = {
  dataConnectionState: []
};

export const dataConnectionStateSlice = createSlice({
  name: "dataconnection",
  initialState,
  reducers: {
    setDataConnectionState: (state, action: PayloadAction<Object>) => {
      state.dataConnectionState = action.payload;
    },
    getDataConnectionState: (state) => state.dataConnectionState,
    resetDataConnectionState: (state) => {
      state.dataConnectionState = [];
    }
  }
});

export const {
  setDataConnectionState,
  getDataConnectionState,
  resetDataConnectionState
} = dataConnectionStateSlice.actions;

export default dataConnectionStateSlice.reducer;