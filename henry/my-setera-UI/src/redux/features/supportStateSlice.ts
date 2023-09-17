import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type supportState = {
  supportState: any;
};

const initialState: supportState = {
  supportState: []
};

export const supportStateSlice = createSlice({
  name: "supportState",
  initialState,
  reducers: {
    setSupportState: (state, action: PayloadAction<Object>) => {
      state.supportState = action.payload
    },
    getSupportState: (state) => state.supportState,
    resetSupportState: (state) => {
      state.supportState = [];
    }
  }
});

export const {
  setSupportState,
  getSupportState,
  resetSupportState
} = supportStateSlice.actions;

export default supportStateSlice.reducer;