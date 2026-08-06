import axios from "axios";

const api = axios.create({
  baseURL: "https://api.luma-agent.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
