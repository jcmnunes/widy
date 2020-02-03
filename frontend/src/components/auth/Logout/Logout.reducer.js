import { LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './Logout.types';

const initialState = {
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { ...state, loading: true };
    case LOGOUT_SUCCESS:
      return { ...state, loading: false };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
