import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mobileUserState = {
    mobileUserState: any;
};

const initialState: mobileUserState = {
    mobileUserState: []
};

export const mobileUserStateSlice = createSlice({
    name: "mobileUserState",
    initialState,
    reducers: {
        setMobileUserState: (state, action: PayloadAction<Object>) => {
            state.mobileUserState = action.payload
        },
        getMobileUserState: (state) => state.mobileUserState,
        resetMobileUserState: (state) => {
            state.mobileUserState = [];
        }
    }
});

export const {
    setMobileUserState,
    getMobileUserState,
    resetMobileUserState
} = mobileUserStateSlice.actions;

export default mobileUserStateSlice.reducer;