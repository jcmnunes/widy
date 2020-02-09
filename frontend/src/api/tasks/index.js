import axios from 'axios';

export const createTask = data => axios.post('/api/tasks', data);

export const getActiveTask = () => axios.get('/api/tasks/active');

export const moveTask = (taskId, params) => axios.put(`/api/tasks/${taskId}/move`, params);

export const updateTask = (taskId, params) => axios.put(`/api/tasks/${taskId}`, params);

export const deleteTask = (taskId, params) =>
  axios.delete(`/api/tasks/${taskId}`, { data: params });

export const startTask = (taskId, params) => axios.put(`/api/tasks/${taskId}/start`, params);

export const stopTask = (taskId, params) => axios.put(`/api/tasks/${taskId}/stop`, params);
