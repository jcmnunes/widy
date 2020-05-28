import axios from 'axios';
import store from '../store/store';
import { logoutRequest } from '../features/auth/Logout/Logout.actions';

axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutRequest());
    }
    return Promise.reject(error);
  },
);
