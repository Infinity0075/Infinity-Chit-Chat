import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true, //send the cokiees with the request...
});
