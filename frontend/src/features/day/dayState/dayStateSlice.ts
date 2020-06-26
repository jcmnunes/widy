import { createSlice } from '@reduxjs/toolkit';

interface DayState {
  showSchedule: boolean;
}

const initialState: DayState = {
  showSchedule: false,
};

const dayState = createSlice({
  name: 'day',
  initialState,
  reducers: {
    toggleSchedule(state) {
      state.showSchedule = !state.showSchedule;
    },
    showSchedule(state) {
      state.showSchedule = true;
    },
    hideSchedule(state) {
      state.showSchedule = false;
    },
  },
});

export const dayStateReducer = dayState.reducer;
export const dayStateActions = dayState.actions;
