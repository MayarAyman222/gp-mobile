import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = `${APP_CONFIG.apiUrl}/auth`;

export const signup = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const login = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, userData);

    if (res.data && res.data.user) {
      return res.data; // الرجوع بالبيانات كاملة لو موجود
    } else {
      throw { message: "User not found" };
    }
  } catch (error) {
    throw error.response?.data || { message: error.message || "Login failed" };
  }
};
