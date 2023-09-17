import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type organizationState = {
  organizationState: any,
  orgCount: number,
  orgSearchState: any,
  orgSearchCount: number,
};

const initialState: organizationState = {
  organizationState: [],
  orgCount: 0,
  orgSearchState: [],
  orgSearchCount: 0,

};

export const organizationStateSlice = createSlice({
  name: "organizationState",
  initialState,
  reducers: {
    setorganizationState: (state, action: PayloadAction<any>) => {
      state.organizationState = action.payload;
    },
    setOrgCount: (state, action: PayloadAction<any>) => {
      state.orgCount = action.payload;
    },
    setSearchOrg: (state, action: PayloadAction<any>) => {
      state.orgSearchState = action.payload;
    },
    setSearchOrgCount: (state, action: PayloadAction<any>) => {
      state.orgSearchCount = action.payload;
    },
    removeorganizationState: (state) => {
      state.organizationState = [];
      state.orgCount = 0;
      state.orgSearchState = [];
      state.orgSearchCount = 0;
    }
  }
});

export const {
  setorganizationState,
  removeorganizationState,
  setOrgCount,
  setSearchOrgCount,
  setSearchOrg
} = organizationStateSlice.actions;

export default organizationStateSlice.reducer;