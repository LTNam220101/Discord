import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const accessToken = userInfo.accessToken;
    if (accessToken && !config.headers!.Authorization) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    if (config.headers!["Content-Type"] !== "multipart/form-data") {
      config.headers!["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/sign-in" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/auth/refresh", undefined, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              "Content-Type": "application/json"
            }
          });

          const { accessToken, refreshToken } = rs.data;
          const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
          userInfo.accessToken = accessToken;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("refreshToken", refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export const logout = async () => {
  try {
    const response = await instance.post("/auth/sign-out");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default instance;
