import { RESET_FAILURE, RESET_REQUEST, RESET_SUCCESS } from './Reset.types';

const initialState = {
  loading: false,
  error: '',
};

export const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_REQUEST:
      return { ...state, loading: true };
    case RESET_SUCCESS:
      return { ...state, loading: false };
    case RESET_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
