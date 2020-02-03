import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_LOGIN_ERROR } from './Login.types';

export const loginRequest = params => ({
  type: LOGIN_REQUEST,
  params,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const resetLoginError = () => ({
  type: RESET_LOGIN_ERROR,
});
