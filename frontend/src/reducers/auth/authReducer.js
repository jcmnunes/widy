import { combineReducers } from 'redux';

import authenticated from './authenticatedReducer';
import login from '../../components/auth/Login/Login.reducer';
import logout from '../../components/auth/Logout/Logout.reducer';
import forgot from '../../components/auth/Forgot/Forgot.reducer';
import reset from '../../components/auth/Reset/Reset.reducer';
import init from '../../components/auth/Init/Init.reducer';

const authReducer = combineReducers({
  authenticated,
  login,
  logout,
  forgot,
  reset,
  init,
});

export default authReducer;
