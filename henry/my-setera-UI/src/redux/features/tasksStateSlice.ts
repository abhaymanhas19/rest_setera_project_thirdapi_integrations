import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type tasksState = {
  tasksState: any;
};

const initialState: tasksState = {
  tasksState: []
};

export const tasksStateSlice = createSlice({
  name: "tasksState",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Object>) => {
      state.tasksState = action.payload
    },
    getTasks: (state) => state.tasksState,
    resetTaskState: (state) => {
      state.tasksState = [];
    }
  }
});

export const {
  setTasks,
  getTasks,
  resetTaskState
} = tasksStateSlice.actions;

export default tasksStateSlice.reducer;