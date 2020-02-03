import axios from 'axios';

export const createTask = data => axios.post('/api/tasks', data);
export const updateTask = (taskId, params) => axios.put(`/api/tasks/${taskId}`, params);
export const moveTask = params => axios.put('/api/tasks/move', params);
export const startTask = (taskId, params) => axios.put(`/api/tasks/start/${taskId}`, params);
export const stopTask = (taskId, params) => axios.put(`/api/tasks/stop/${taskId}`, params);
export const deleteTask = (taskId, params) =>
  axios.delete(`/api/tasks/${taskId}`, { data: params });
export const getActiveTask = () => axios.get('/api/tasks/active');
