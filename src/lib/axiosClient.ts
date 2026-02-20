import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  
  baseURL: "http://192.168.0.207:8085",

});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `${token}`;
  return config;
});

export default api;
