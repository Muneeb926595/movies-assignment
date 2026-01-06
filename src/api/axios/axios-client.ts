import { TMDB_CONFIG } from '../config';
import { StorageKeys, storageService } from '../../services/storage';
import errorHandler from '../../services/error-handler';
import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use(
  async config => {
    try {
      const token: any = await storageService.getItem(StorageKeys.ACCESS_TOKEN);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor: centralized error handling and retry support
axiosClient.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    try {
      const parsed = errorHandler.parseApiError(error);

      // 401: clear session and show message (no retry)
      if (parsed.status === 401) {
        await errorHandler.showApiErrorAlert(error);
        return Promise.reject(error);
      }

      // For other errors, show alert with Retry option which will re-run the request if chosen
      return new Promise((_, reject) => {
        errorHandler
          .showApiErrorAlert(error, {
            onRetry: () => axiosClient.request(error.config as any),
          })
          .then(() => reject(error))
          .catch(() => reject(error));
      });
    } catch (e) {
      return Promise.reject(error);
    }
  },
);

export default axiosClient;
