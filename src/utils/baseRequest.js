import axios from "axios";
import Cookies from "js-cookie";

export const axiosBaseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`,
  headers: {
    "X-Client-Type": "web",
  },
  withCredentials: true,
  timeout: 30000,
};

const request = axios.create(axiosBaseConfig);

// Request interceptor
request.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth/refresh-token`,
          { token: refreshToken },
          {
            headers: { "X-Client-Type": "web" },
            withCredentials: true,
          }
        );
        const newAccessToken = res.data.data.accessToken;
        Cookies.set("accessToken", newAccessToken, { secure: true, sameSite: "strict" });
        request.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return request(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    } else if (error.response.status === 403) {
      throw Object.assign(new Error("Unauthorized Access"), { statusCode: 403 });
    }
    return Promise.reject(error);
  }
);

export default request;
