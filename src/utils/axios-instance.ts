// utils/axios.ts
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT ||
  'https://foodkeys-api-dev.liara.run/api/v1/client/panel';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refAxios = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
