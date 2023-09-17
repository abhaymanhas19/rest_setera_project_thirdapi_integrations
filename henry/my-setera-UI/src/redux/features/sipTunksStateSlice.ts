import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sipTunksState = {
  sipTunksState: any;
};

const initialState: sipTunksState = {
  sipTunksState: []
};

export const sipTunksStateSlice = createSlice({
  name: "sipTunksState",
  initialState,
  reducers: {
    updateSipTunks: (state, action: PayloadAction<Object>) => {
      state = { ...state, sipTunksState: action.payload }
    },
    setSipTunks: (state, action: PayloadAction<Object>) => {
      state.sipTunksState = action.payload
    },
    getSipTrunks: (state) => state.sipTunksState,
    resetSipTrucksState: (state) => {
      state.sipTunksState = [];
    }
  }
});

export const {
  setSipTunks,
  getSipTrunks,
  resetSipTrucksState
} = sipTunksStateSlice.actions;

export default sipTunksStateSlice.reducer;