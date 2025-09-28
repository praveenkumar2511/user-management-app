import axios from "axios";
import { getToken, clearToken } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000",
    headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY, // ✅ add your API key here
  },
  timeout: 15000,
});
console.log(import.meta.env.VITE_API_BASE_URL,"import.meta.env.VITE_API_BASE_URL");

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // token invalid/expired -- clear local token
      clearToken();
      // UI will respond to auth state change; avoid direct redirects here
    }
    return Promise.reject(err);
  }
);

export default api;
