import * as types from '../../actions/tasks/types';
import * as daysTypes from '../../actions/days/types';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case daysTypes.GET_DAY_SUCCESS:
      return {
        ...state,
        ...action.tasks,
      };
    case types.STORE_CREATE_TASK_DATA:
      return {
        ...state,
        createTask: {
          ...state.createTask,
          dayId: action.dayId,
          sectionId: action.sectionId,
        },
      };
    case types.CREATE_TASK_REQUEST:
      return {
        ...state,
        createTask: {
          ...state.createTask,
          loading: true,
        },
      };
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.task.id]: action.payload.task,
        },
        createTask: {
          ...state.createTask,
          loading: false,
        },
      };
    case types.STORE_SELECTED_TASK_ID:
      return {
        ...state,
        selected: action.taskId,
      };
    case daysTypes.STORE_SELECTED_DAY:
      return {
        ...state,
        selected: '',
      };
    case types.UPDATE_TASK_SUCCESS:
    case types.UPDATE_TASK_FAILURE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.taskId]: {
            ...state.byId[action.taskId],
            ...action.payload,
          },
        },
      };
    case types.DELETE_TASK_SUCCESS: {
      const { [action.taskId]: val, ...newTasksById } = state.byId;
      return {
        ...state,
        byId: newTasksById,
      };
    }
    default:
      return state;
  }
};
