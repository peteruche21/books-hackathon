import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3000/api",
//   timeout: 40000,
// })

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    timeout: 40000,
  },
};

const req = axios.create(config);

export default req;
