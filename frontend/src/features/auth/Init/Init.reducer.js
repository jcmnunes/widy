import { INIT_FAILURE, INIT_REQUEST, INIT_SUCCESS } from './Init.types';
import { LOGOUT_SUCCESS } from '../Logout/Logout.types';
import { SAVE_ACCOUNT_SETTINGS_SUCCESS } from '../../settings/Page/Account/Account.actions';

const initialState = {
  loading: false,
  user: {
    scopes: [],
    archivedScopes: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_REQUEST:
      return { ...state, loading: true };
    case INIT_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case INIT_FAILURE:
      return { ...state, loading: false };
    case SAVE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.accountSettings,
        },
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
