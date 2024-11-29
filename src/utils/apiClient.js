import axios from "axios";
import { BASE_URL } from "./config";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

export default apiClient;
