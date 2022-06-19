import axios from "axios";
const token = localStorage.getItem("JWTTOKEN");


const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


export default axiosInstance;
