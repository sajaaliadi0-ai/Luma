import axios from "axios";

export const API_BASE_URL = "https://api.luma-agent.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// ADD AUTH TOKEN TO EVERY REQUEST
// =========================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const cleanToken = token
        .replace(/^Bearer\s+/i, "")
        .trim();

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${cleanToken}`;

      console.log(
        "API REQUEST:",
        config.method?.toUpperCase(),
        config.url
      );

      console.log(
        "AUTH HEADER:",
        `Bearer ${cleanToken.substring(0, 20)}...`
      );
    } else {
      console.warn("API REQUEST: No token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================================================
// HANDLE 401
// =========================================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error(
        "API 401 UNAUTHORIZED:",
        error.config?.url
      );

      console.error(
        "Response:",
        error.response?.data
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }

    return Promise.reject(error);
  }
);

export default api;