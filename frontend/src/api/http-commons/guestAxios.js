import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const guestAxios = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000, // 10초
});

export default guestAxios;
