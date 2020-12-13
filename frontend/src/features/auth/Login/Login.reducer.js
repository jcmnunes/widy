import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_LOGIN_ERROR } from './Login.types';

const initialState = {
  loading: false,
  error: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case RESET_LOGIN_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
};
