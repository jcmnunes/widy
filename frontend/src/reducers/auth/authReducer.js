import { combineReducers } from 'redux';

import authenticated from './authenticatedReducer';
import login from '../../features/auth/Login/Login.reducer';
import logout from '../../features/auth/Logout/Logout.reducer';
import forgot from '../../features/auth/Forgot/Forgot.reducer';
import reset from '../../features/auth/Reset/Reset.reducer';
import init from '../../features/auth/Init/Init.reducer';

const authReducer = combineReducers({
  authenticated,
  login,
  logout,
  forgot,
  reset,
  init,
});

export default authReducer;
