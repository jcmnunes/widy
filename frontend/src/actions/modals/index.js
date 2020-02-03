import * as types from './types';

export const openModal = modal => ({
  type: types.OPEN_MODAL,
  payload: modal,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
  payload: '',
});
