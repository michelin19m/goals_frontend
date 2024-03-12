import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000', // Your API base URL
});

httpClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
