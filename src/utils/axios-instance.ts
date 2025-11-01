// utils/axios.ts
import axios from 'axios';
import { API_BASE_URL } from '@/config/api.config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refAxios = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
