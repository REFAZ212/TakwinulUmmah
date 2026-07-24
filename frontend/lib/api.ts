import axios from "axios";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/public` : "/api/public",
  headers: { "Content-Type": "application/json" },
});

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin` : "/api/admin",
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("admin_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      sessionStorage.removeItem("admin_access_token");
      window.location.href = "/portal-manajemen/login";
    }
    return Promise.reject(err);
  },
);
