import {
  FORGOT_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  RESET_FORGOT_MESSAGE,
} from './Forgot.types';

const initialState = {
  loading: false,
  message: '',
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_REQUEST:
      return { ...state, loading: true };
    case FORGOT_SUCCESS:
      return { ...state, loading: false, message: action.message };
    case FORGOT_FAILURE:
      return { ...state, loading: false, error: action.error };
    case RESET_FORGOT_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
};
