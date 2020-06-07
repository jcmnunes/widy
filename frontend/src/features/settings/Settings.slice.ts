import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  isSettingsMenuOpen: boolean;
}

const initialState: SettingsState = {
  isSettingsMenuOpen: false,
};

const settingsSlice = createSlice({
  name: 'settingsSidebar',
  initialState,
  reducers: {
    openSettingsSidebar(state) {
      state.isSettingsMenuOpen = true;
    },
    closeSettingsSidebar(state) {
      state.isSettingsMenuOpen = false;
    },
  },
});

export const settingsSliceReducer = settingsSlice.reducer;
export const settingsSliceActions = settingsSlice.actions;
