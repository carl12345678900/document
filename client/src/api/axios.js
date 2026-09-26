import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Access token expired
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token is automatically sent as cookie
        const response = await api.post("/auth/refresh");

        const newToken = response.data.accessToken;

        localStorage.setItem("token", newToken);

        // Try the original request again
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log(err);

        // Refresh token expired → logout
        localStorage.removeItem("token");
        window.location.href = "/account";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
