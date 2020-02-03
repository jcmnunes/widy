import {
  GET_REPORT_FAILURE,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
  REPORT_GET_DAYS_FAILURE,
  REPORT_GET_DAYS_REQUEST,
  REPORT_GET_DAYS_SUCCESS,
} from './Report.actions';

const initialState = {
  reportLoading: true,
  daysLoading: true,
  days: [],
  report: {
    dayId: null,
    day: null,
    totalTime: null,
    totalTasks: null,
    completedTasks: null,
    tasks: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_GET_DAYS_REQUEST:
      return { ...state, daysLoading: true };
    case REPORT_GET_DAYS_SUCCESS:
      return { ...state, days: action.days, daysLoading: false };
    case REPORT_GET_DAYS_FAILURE:
      return { ...state, days: [], daysLoading: false };
    case GET_REPORT_REQUEST:
      return { ...state, reportLoading: true };
    case GET_REPORT_SUCCESS:
      return { ...state, report: action.report, reportLoading: false };
    case GET_REPORT_FAILURE:
      return { ...state, report: initialState.report, reportLoading: false };
    default:
      return state;
  }
};
