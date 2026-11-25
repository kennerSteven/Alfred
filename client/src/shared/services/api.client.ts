import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '../types/api.types.ts';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token JWT automáticamente
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('alfred_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para normalizar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Si la sesión expiró (401), se puede limpiar token
    if (error.response?.status === 401) {
      localStorage.removeItem('alfred_auth_token');
      localStorage.removeItem('alfred_auth_user');
    }

    const customMessage = error.response?.data?.message || error.message || 'Error en la comunicación con el servidor';
    return Promise.reject({
      status: error.response?.status,
      message: customMessage,
      errors: error.response?.data?.errors,
    });
  }
);

export default apiClient;
