import { createSlice } from '@reduxjs/toolkit';

interface ActiveTaskState {
  tick: number;
}

const initialState: ActiveTaskState = {
  tick: -1,
};

const activeTask = createSlice({
  name: 'activeTask',
  initialState,
  reducers: {
    activeTaskTick(state) {
      state.tick = Date.now();
    },
  },
});

export const activeTaskReducer = activeTask.reducer;
export const activeTaskActions = activeTask.actions;
