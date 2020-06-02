import { createStore, applyMiddleware } from 'redux';
import { Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from '../reducers';
import type { RootState } from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: ['activeTask/activeTaskTick'],
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
);

export const runSaga = () => sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
