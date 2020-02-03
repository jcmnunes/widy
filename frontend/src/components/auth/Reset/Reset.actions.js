import { RESET_FAILURE, RESET_REQUEST, RESET_RESET_ERROR, RESET_SUCCESS } from './Reset.types';

export const resetRequest = params => ({
  type: RESET_REQUEST,
  params,
});

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});

export const resetFailure = error => ({
  type: RESET_FAILURE,
  error,
});

export const resetResetError = () => ({
  type: RESET_RESET_ERROR,
});
