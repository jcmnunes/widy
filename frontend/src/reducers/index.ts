import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import modals from './modals';
import days from './days/daysReducer';
import sections from './sections/sectionsReducer';
import tasks from './tasks/tasksReducer';
import activeTask from './activeTask/activeTaskReducer';
import report from '../components/report/Report.reducer';
import { activeTaskReducer as newActiveTask } from '../features/day/activeTask/activeTaskSlice';
import { sidebarSliceReducer as sidebar } from '../features/day/SideBar/SidebarSlice';
import { daysNavSliceReducer as daysNav } from '../features/daysNav/DaysNavSlice';

const rootReducer = combineReducers({
  auth,
  modals,
  days,
  sections,
  tasks,
  activeTask,
  report,
  newActiveTask,
  sidebar,
  daysNav,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
