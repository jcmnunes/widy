import { combineReducers } from 'redux';

import { authenticatedReducer as authenticated } from './authenticatedReducer';
import { loginReducer as login } from '../../features/auth/Login/Login.reducer';
import { logoutReducer as logout } from '../../features/auth/Logout/Logout.reducer';
import { forgotReducer as forgot } from '../../features/auth/Forgot/Forgot.reducer';
import { resetReducer as reset } from '../../features/auth/Reset/Reset.reducer';
import { initReducer as init } from '../../features/auth/Init/Init.reducer';

const authReducer = combineReducers({
  authenticated,
  login,
  logout,
  forgot,
  reset,
  init,
});

export default authReducer;
