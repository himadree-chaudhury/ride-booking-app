import axios, { type AxiosRequestConfig } from "axios";
import httpStatus from "http-status-codes";
import envConfig from "./env";

export const axiosInstance = axios.create({
  baseURL: envConfig.BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Keep track of refreshing token state
let isRefreshing = false;

// Keep track of pending requests while refreshing token
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

// Process the pending queue after token refresh
const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Catch the request that failed
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    // Check if the error is due to an expired token
    if (
      error.response.data.status === httpStatus.UNAUTHORIZED &&
      error.response.data.message === "Invalid or expired token." &&
      !originalRequest._retry
    ) {
      // Mark the request as retried
      originalRequest._retry = true;

      // If a token refresh is already in progress store the request to the queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      // If we reach here, it means we need to refresh the token
      isRefreshing = true;

      // Attempt to refresh the token
      try {
        await axiosInstance.post("/auth/refresh-token");

        // Clear the pending queue with the new token
        processQueue(null);

        // Retry the original request that failed first
        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        // Reset the refreshing state
        isRefreshing = false;
      }
    }

    // Check if the error is due to forbidden access
    if (error.response?.status === httpStatus.FORBIDDEN) {
      await axiosInstance.post("/auth/logout");
      window.location.href = "/sign-in";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
