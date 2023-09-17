import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
  appState: string;
  appTitle: string;
  appCountry: String;
  appOrg: any;
  appCurrentPageForm: "yes" | "no" | "process";
  appNextRoute: string;
  appPrevRoute: string;
};

const initialState: appState = {
  appState: "Home",
  appTitle: "Home",
  appCountry: "GB",
  appOrg: {},
  appCurrentPageForm: "no",
  appNextRoute: "",
  appPrevRoute: ""
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setAppTitleState: (state, action: PayloadAction<string>) => {
      state.appTitle = action.payload;
    },
    setAppCountry: (state, action: PayloadAction<any>) => {
      state.appCountry = action.payload;
    },
    setAppOrg: (state, action: PayloadAction<any>) => {
      state.appOrg = action.payload;
    },
    setAppcurrentPageForm: (state, action: PayloadAction<any>) => {
      state.appCurrentPageForm = action.payload;
    },
    setAppNextRoute: (state, action: PayloadAction<any>) => {
      state.appNextRoute = action.payload;
    },
    setAppPrevRoute: (state, action: PayloadAction<any>) => {
      state.appPrevRoute = action.payload;
    },
    resetAppState: (state) => {
      state.appState = "Home";
      state.appTitle = "Home";
      state.appCountry = "GB";
      state.appOrg = {};
      state.appCurrentPageForm = "no";
      state.appNextRoute = "";
      state.appPrevRoute = "";
    }
  }
});

export const {
  setAppState,
  setAppTitleState,
  setAppCountry,
  setAppOrg,
  resetAppState,
  setAppcurrentPageForm,
  setAppNextRoute,
  setAppPrevRoute
} = appStateSlice.actions;

export default appStateSlice.reducer;