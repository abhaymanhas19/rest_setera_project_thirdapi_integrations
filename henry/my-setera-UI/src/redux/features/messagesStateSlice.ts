import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type messageState = {
    messageState: any
};

const initialState: messageState = {
    messageState: []
};

export const messageStateSlice = createSlice({
    name: "messageState",
    initialState,
    reducers: {
        setMessageState: (state, action: PayloadAction<any>) => {
            state.messageState = action.payload;
        },
        removeMessageState: (state) => {
            state.messageState = []
        }
    }
});

export const {
    setMessageState,
    removeMessageState
} = messageStateSlice.actions;

export default messageStateSlice.reducer;