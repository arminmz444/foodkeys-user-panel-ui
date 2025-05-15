// utils/axios.ts
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT ||
  'http://192.168.43.57:8080/api/v1/client/panel';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refAxios = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
