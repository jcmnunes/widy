import * as types from '../../actions/activeTask/types';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ACTIVE_TASK:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_ACTIVE_TASK:
      return initialState;
    case types.STORE_ACTIVE_TASK:
    case types.ACTIVE_TASK_SUCCESS:
      return action.activeTask;
    default:
      return state;
  }
};
