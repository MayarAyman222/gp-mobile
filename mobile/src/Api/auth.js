
import axios from "axios";

const BASE_URL = "http://192.168.0.102:5000/api/auth";

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
