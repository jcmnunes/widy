import moment from 'moment';

export const formatDay = day => `${moment(day).format('ddd DD')} ${moment(day).format('MMM YYYY')}`;

export const isToday = day => moment(day).isSame(moment().format('YYYY-MM-DD'), 'day');
