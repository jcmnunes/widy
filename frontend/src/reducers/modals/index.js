import * as types from '../../actions/modals/types';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { ...state, modal: action.payload };
    case types.CLOSE_MODAL:
      return { ...state, modal: '' };
    default:
      return state;
  }
};
