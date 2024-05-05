import axios from "axios";

const REACT_APP_API_BASE_URL = "https://api.weekday.technology/adhoc/";

const openAxiosInstance = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
});

export { openAxiosInstance };
