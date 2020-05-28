import { LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './Logout.types';

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});
