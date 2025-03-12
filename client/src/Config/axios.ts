import axios from "axios";
import { APP_URL } from ".";

const api = axios.create({
    baseURL: APP_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401 ){
            if (error?.response?.status === 401) {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
            }
            localStorage.removeItem('access_token');

        }
    })

export default api;