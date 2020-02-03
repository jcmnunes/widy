import moment from 'moment';

export const formatDay = day => `${moment(day).format('ddd DD')} ${moment(day).format('MMM YYYY')}`;
