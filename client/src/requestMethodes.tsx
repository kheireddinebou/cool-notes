import axios from "axios";

const BASE_URL = "https://cool-notes.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
