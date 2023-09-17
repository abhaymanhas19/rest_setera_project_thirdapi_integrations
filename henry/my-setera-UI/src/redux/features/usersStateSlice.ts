import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  userState: any;
};

const initialState: userState = {
  userState: []
};

export const usersStateSlice = createSlice({
  name: "usersState",
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<Object>) => {
      state.userState = action.payload;
    },
    getUsersState: (state) => state.userState,
    updateUsersState: (state, action: PayloadAction<Object>) => {
      state.userState = { ...state, userState: action.payload };
    },
    resetUserState: (state) => {
      state.userState = [];
    }
  }
});

export const {
  setUsersState,
  getUsersState,
  resetUserState
} = usersStateSlice.actions;

export default usersStateSlice.reducer;