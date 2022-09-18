import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3000/api",
//   timeout: 40000,
// })

const URL = process.env.NEXT_PUBLIC_BASE_API;

const config: AxiosRequestConfig = {
  baseURL: URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    timeout: 40000,
  },
};

const req = axios.create(config);

export default req;
