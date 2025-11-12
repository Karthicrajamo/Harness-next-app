import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// ✅ Correct typing for Axios v1+
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  if (token) {
    // Ensure headers exist
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
