import axios from "axios";

const api = axios.create({
  baseURL: "https://api.luma-agent.com",
});

export default api;