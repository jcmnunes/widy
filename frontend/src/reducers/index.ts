import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import { activeTaskReducer as activeTask } from '../features/day/activeTask/activeTaskSlice';
import { sidebarSliceReducer as sidebar } from '../features/day/SideBar/SidebarSlice';
import { daysNavSliceReducer as daysNav } from '../features/daysNav/DaysNavSlice';

const rootReducer = combineReducers({
  auth,
  activeTask,
  sidebar,
  daysNav,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
