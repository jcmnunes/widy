import { LOGIN_SUCCESS } from '../../features/auth/Login/Login.types';
import { RESET_SUCCESS } from '../../features/auth/Reset/Reset.types';
import { LOGOUT_SUCCESS } from '../../features/auth/Logout/Logout.types';
import { INIT_FAILURE, INIT_SUCCESS } from '../../features/auth/Init/Init.types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case RESET_SUCCESS:
      return true;
    case LOGOUT_SUCCESS:
      return false;
    case INIT_SUCCESS:
      return true;
    case INIT_FAILURE:
      return false;
    default:
      return state;
  }
};
