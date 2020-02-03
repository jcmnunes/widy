import { LOGIN_SUCCESS } from '../../components/auth/Login/Login.types';
import { RESET_SUCCESS } from '../../components/auth/Reset/Reset.types';
import { LOGOUT_SUCCESS } from '../../components/auth/Logout/Logout.types';
import { INIT_FAILURE, INIT_SUCCESS } from '../../components/auth/Init/Init.types';

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
