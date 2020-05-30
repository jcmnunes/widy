import { queryCache } from 'react-query';
import { LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './Logout.types';

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => {
  queryCache.clear();

  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});
