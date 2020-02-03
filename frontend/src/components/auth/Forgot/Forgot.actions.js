import {
  FORGOT_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  RESET_FORGOT_MESSAGE,
} from './Forgot.types';

export const forgotRequest = params => ({
  type: FORGOT_REQUEST,
  params,
});

export const forgotSuccess = message => ({
  type: FORGOT_SUCCESS,
  message,
});

export const forgotFailure = error => ({
  type: FORGOT_FAILURE,
  error,
});

export const resetForgotMessage = () => ({
  type: RESET_FORGOT_MESSAGE,
});
