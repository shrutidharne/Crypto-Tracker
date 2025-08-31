import axios from "axios";

const BASE_URL = "https://crypto-tracker-1-lxo3.onrender.com/api/auth";

export const register = (data: any) => axios.post(`${BASE_URL}/register`, data);

export const login = (data: any) => axios.post(`${BASE_URL}/login`, data);
