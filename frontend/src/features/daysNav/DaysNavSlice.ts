import { createSlice } from '@reduxjs/toolkit';

interface State {
  isDaysNavOpen: boolean;
}

const initialState: State = {
  isDaysNavOpen: false,
};

const daysNavSlice = createSlice({
  name: 'daysNav',
  initialState,
  reducers: {
    openDaysNav(state) {
      state.isDaysNavOpen = true;
    },
    closeDaysNav(state) {
      state.isDaysNavOpen = false;
    },
  },
});

export const daysNavSliceReducer = daysNavSlice.reducer;
export const daysNavSliceActions = daysNavSlice.actions;
