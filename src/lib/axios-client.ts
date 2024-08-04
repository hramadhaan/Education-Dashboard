import axios from "axios";

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});