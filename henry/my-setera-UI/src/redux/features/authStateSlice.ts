import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  authState: any
  userState: any
  userInfo: any
};

const initialState: authState = {
  authState: {},
  userState: {},
  userInfo: {},
};

export const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      state.authState = action.payload;
    },
    setUserState: (state, action: PayloadAction<any>) => {
      state.userState = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    removeAuthState: (state) => {
      state.authState = {}
      state.userState = {}
    }
  }
});

export const {
  setAuthState,
  removeAuthState,
  setUserState,
  setUserInfo
} = authStateSlice.actions;

export default authStateSlice.reducer;