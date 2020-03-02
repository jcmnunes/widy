import * as types from '../../actions/days/types';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_SELECTED_DAY:
      return { ...state, selected: action.payload };
    case types.GET_DAYS_REQUEST:
      return { ...state, loading: true };
    case types.GET_DAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: action.byId,
        order: action.order,
        selected: action.selectedDayId,
        nextPage: action.nextPage,
      };
    case types.GET_DAYS_FAILURE:
      return { ...state, loading: false };
    case types.GET_MORE_DAYS_REQUEST:
      return { ...state, isLoadingMoreDays: true };
    case types.GET_MORE_DAYS_SUCCESS:
      return {
        ...state,
        isLoadingMoreDays: false,
        byId: {
          ...state.byId,
          ...action.byId,
        },
        order: [...state.order, ...action.order],
        nextPage: action.nextPage,
      };
    case types.GET_MORE_DAYS_FAILURE:
      return { ...state, isLoadingMoreDays: false };
    case types.CREATE_DAY_REQUEST:
      return { ...state, createDayLoading: true };
    case types.CREATE_DAY_SUCCESS:
      return {
        ...state,
        createDayLoading: false,
        selected: action.day.id,
        order: [action.day.id, ...state.order],
        byId: { ...state.byId, [action.day.id]: action.day },
      };
    case types.CREATE_DAY_FAILURE:
      return { ...state, createDayLoading: false };
    default:
      return state;
  }
};
