/**
 * Centralized API Configuration
 * All API URLs should be imported from this file
 * Configure via environment variables
 */

// Base API URL for client panel endpoints
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT ||
  'http://localhost:8080/api/v1/client/panel';

// Base URL for static files (images, documents, etc.)
export const STATIC_FILES_URL =
  process.env.NEXT_PUBLIC_STATIC_FILES_URL || 'http://localhost:8080';

// WebSocket URL for real-time communication
export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';

// Full base URL (without /api/v1/client/panel)
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

// Specific API endpoints that might be used directly
export const API_ENDPOINTS = {
  // Subscription endpoints
  subscription: `${BASE_URL}/api/v1/subscription`,
  discount: (code: string) => `${BASE_URL}/api/v1/discount/${encodeURIComponent(code)}/use`,
  
  // Company endpoints
  company: {
    list: (pageNumber: number, pageSize: number, categoryId?: number) =>
      `${BASE_URL}/api/v1/company/?pageNumber=${pageNumber}&pageSize=${pageSize}${categoryId ? `&categoryId=${categoryId}` : ''}`,
    search: (query: string, page: number, size: number) =>
      `${BASE_URL}/api/v1/search/company?query=${query}&page=${page}&size=${size}`,
  },
  
  // File upload endpoints
  files: {
    temp: `${API_BASE_URL}/company/file/temp`,
  },
};

const apiConfig = {
  API_BASE_URL,
  STATIC_FILES_URL,
  WS_URL,
  BASE_URL,
  API_ENDPOINTS,
};

export default apiConfig;

