import { INIT_FAILURE, INIT_REQUEST, INIT_SUCCESS } from './Init.types';

export const initRequest = () => ({
  type: INIT_REQUEST,
});

export const initSuccess = user => ({
  type: INIT_SUCCESS,
  user,
});

export const initFailure = () => ({
  type: INIT_FAILURE,
});
