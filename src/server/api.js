import axios from "axios";
import TokenService from "./token.service";

const customAxios = (contentType) => { 
  const API = import.meta.env.VITE_SERVER_URL
  
  const instance = axios.create({
    baseURL: API,
    headers: {
      "Content-Type": contentType
    }
  });
  
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
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
  
      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const refreshToken = TokenService.getLocalRefreshToken();
            const rs = await instance.get(`auth/token?refreshToken=${refreshToken}`);
  
            console.log(rs);
  
            const { accessToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);
  
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
  
      return Promise.reject(err);
    }
  );
  
  return instance;
}

export default customAxios;
