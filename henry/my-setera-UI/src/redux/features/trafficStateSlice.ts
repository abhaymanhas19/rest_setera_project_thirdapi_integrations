import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type trafficState = {
  trafficState: any;
  trafficSumService: any;
  trafficSumSubscription: any;
  trafficSumDetailSubscrription: any;
  trafficCDRs: any;
};

const initialState: trafficState = {
  trafficState: [],
  trafficSumService: [],
  trafficSumSubscription: [],
  trafficSumDetailSubscrription: [],
  trafficCDRs: []
};

export const trafficStateSlice = createSlice({
  name: "trafficState",
  initialState,
  reducers: {
    setTrafficSumService: (state, action: PayloadAction<Object>) => {
      state.trafficSumService = action.payload
    },
    setTrafficSumSubscription: (state, action: PayloadAction<Object>) => {
      state.trafficSumSubscription = action.payload
    },
    setTrafficSumDetailSubscrription: (state, action: PayloadAction<Object>) => {
      state.trafficSumDetailSubscrription = action.payload
    },
    setTrafficCDRs: (state, action: PayloadAction<Object>) => {
      state.trafficCDRs = action.payload
    },
    getTrafficSumService: (state) => state.trafficSumService,
    getTrafficSumSubscription: (state) => state.trafficSumSubscription,
    getTrafficSumDetailSubscrription: (state) => state.trafficSumDetailSubscrription,
    getTrafficCDRs: (state) => state.trafficCDRs,
    resetTrafficState: (state) => {
      state.trafficCDRs = [];
      state.trafficState = [];
      state.trafficSumDetailSubscrription = [];
      state.trafficSumService = [];
      state.trafficSumSubscription = [];
    }
  }
});

export const {
  setTrafficSumService,
  setTrafficSumSubscription,
  setTrafficSumDetailSubscrription,
  setTrafficCDRs,
  getTrafficCDRs,
  getTrafficSumService,
  getTrafficSumSubscription,
  getTrafficSumDetailSubscrription,
  resetTrafficState
} = trafficStateSlice.actions;

export default trafficStateSlice.reducer;