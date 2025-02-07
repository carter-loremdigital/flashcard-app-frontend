import axios, { AxiosInstance } from "axios";

// Create an Axios instance with a base URL.
// You can define REACT_APP_API_URL in your .env file.
// For development, fallback to http://127.0.0.1:8000/api
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in headers, if available.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set the Authorization header if the token exists.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Return any request errors
    return Promise.reject(error);
  }
);

// Response interceptor for automatic token refreshing.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if error response is 401 and that we haven't retried already.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // No refresh token, so just reject.
          return Promise.reject(error);
        }
        // Attempt to get a new access token.
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"
          }/token/refresh/`,
          { refresh: refreshToken }
        );
        // Update localStorage with the new access token.
        localStorage.setItem("token", data.access);
        // Update the authorization header and retry the original request.
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, clear tokens and redirect to login.
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
