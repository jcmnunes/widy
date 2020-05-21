import { createSlice } from '@reduxjs/toolkit';

interface SidebarSliceState {
  isSidebarOpen: boolean;
}

const initialState: SidebarSliceState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
  },
});

export const sidebarSliceReducer = sidebarSlice.reducer;
export const sidebarSliceActions = sidebarSlice.actions;
