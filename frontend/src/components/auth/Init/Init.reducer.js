import { INIT_FAILURE, INIT_REQUEST, INIT_SUCCESS } from './Init.types';
import { LOGOUT_SUCCESS } from '../Logout/Logout.types';
import { SAVE_ACCOUNT_SETTINGS_SUCCESS } from '../../settings/Page/Account/Account.actions';
import { SAVE_POMODORO_SETTINGS_SUCCESS } from '../../settings/Page/Pomodoro/Pomodoro.actions';
import {
  CREATE_SCOPE_SUCCESS,
  UPDATE_SCOPE_SUCCESS,
} from '../../settings/Page/Scopes/ScopeModal/ScopeModal.actions';
import {
  ARCHIVE_SCOPE_SUCCESS,
  UNARCHIVE_SCOPE_SUCCESS,
} from '../../settings/Page/Scopes/ScopesTable/ScopesTable.actions';

const initialState = {
  loading: false,
  user: {
    scopes: [],
    archivedScopes: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_REQUEST:
      return { ...state, loading: true };
    case INIT_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case INIT_FAILURE:
      return { ...state, loading: false };
    case SAVE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.accountSettings,
        },
      };
    case SAVE_POMODORO_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          settings: {
            ...state.user.settings,
            pomodoro: action.pomodoroSettings,
          },
        },
      };
    case CREATE_SCOPE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          scopes: [action.scope, ...state.user.scopes],
        },
      };
    case UPDATE_SCOPE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          scopes: state.user.scopes.map(scope => {
            if (scope.id === action.scope.id) {
              return action.scope;
            }
            return scope;
          }),
          archivedScopes: state.user.archivedScopes.map(scope => {
            if (scope.id === action.scope.id) {
              return action.scope;
            }
            return scope;
          }),
        },
      };
    case ARCHIVE_SCOPE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          scopes: state.user.scopes.filter(scope => {
            return scope.id !== action.scope.id;
          }),
          archivedScopes: [action.scope, ...state.user.archivedScopes],
        },
      };
    case UNARCHIVE_SCOPE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          scopes: [action.scope, ...state.user.scopes],
          archivedScopes: state.user.archivedScopes.filter(scope => {
            return scope.id !== action.scope.id;
          }),
        },
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
