import * as types from './types';
import { saveItem } from '../../helpers/localStorage';

export const storeDays = days => ({
  type: types.STORE_DAYS,
  payload: days,
});

export const storeSelectedDay = id => {
  saveItem('selectedDayId', id);

  return {
    type: types.STORE_SELECTED_DAY,
    payload: id,
  };
};

export const getDays = () => ({
  type: types.GET_DAYS_REQUEST,
});

export const getMoreDays = page => ({
  type: types.GET_MORE_DAYS_REQUEST,
  page,
});

export const getDay = id => ({
  type: types.GET_DAY_REQUEST,
  payload: id,
});

export const createDay = () => ({
  type: types.CREATE_DAY_REQUEST,
});
