import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type licenceState = {
  licenceState: any;
  onclouldLicenceProduct: any;
};

const initialState: licenceState = {
  licenceState: [],
  onclouldLicenceProduct: []
};

export const licenceStateSlice = createSlice({
  name: "licenceState",
  initialState,
  reducers: {
    setlicenceState: (state, action: PayloadAction<Object>) => {
      state.licenceState = action.payload;
    },
    setonClouldlicenceState: (state, action: PayloadAction<Object>) => {
      state.onclouldLicenceProduct = action.payload;
    },
    getlicenceState: (state) => state.licenceState,
    getonClouldlicenceState: (state) => state.onclouldLicenceProduct,
    resetLicenceState: (state) => {
      state.licenceState = [];
      state.onclouldLicenceProduct = [];
    }
  }
});

export const {
  setlicenceState,
  getlicenceState,
  setonClouldlicenceState,
  getonClouldlicenceState,
  resetLicenceState
} = licenceStateSlice.actions;

export default licenceStateSlice.reducer;