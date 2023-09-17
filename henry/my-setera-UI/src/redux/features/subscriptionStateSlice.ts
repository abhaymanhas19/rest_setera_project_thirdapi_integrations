import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type subscriptionState = {
  subscriptionState: any,
  singlesubscriptionState: any,
};

const initialState: subscriptionState = {
  subscriptionState: [],
  singlesubscriptionState: [],
};

export const SubscriptionStateSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionState: (state, action: PayloadAction<Object>) => {
      state.subscriptionState = action.payload;
    },
    setSingleSubscriptionState: (state, action: PayloadAction<Object>) => {
      state.singlesubscriptionState = action.payload;
    },
    getSingleSubscriptionState: (state) => state.singlesubscriptionState,
    getSubscriptionState: (state) => state.subscriptionState,
    resetSubsriptionState: (state) => {
      state.singlesubscriptionState = [];
      state.subscriptionState = [];
    }
  }
});

export const {
  setSubscriptionState,
  getSubscriptionState,
  setSingleSubscriptionState,
  getSingleSubscriptionState,
  resetSubsriptionState
} = SubscriptionStateSlice.actions;

export default SubscriptionStateSlice.reducer;