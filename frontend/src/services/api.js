import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('journalToken', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('journalToken');
  }
};

export default api;