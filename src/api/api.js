import axios from "axios";

const api = axios.create({
  baseURL: "https://react-threads-api.vercel.app/api/",
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 123456
  }
});

export default api;