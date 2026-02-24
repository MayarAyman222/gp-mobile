import axios from "axios";
import { Platform } from "react-native";

// BASE_URL على مستوى الـ API بدون تكرار "icons"
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
    : "http://168.231.101.20:5550/api"; // IP جهازك

// Get all icons or filter by category
export const getAllIcons = async (category = null) => {
  let url = `${BASE_URL}/icons`;
  if (category && category !== "All") {
    url += `?category=${encodeURIComponent(category)}`;
  }
  const res = await axios.get(url);
  return res.data;
};

// Get single icon by ID
export const getIconById = async (id) => {
  const res = await axios.get(`${BASE_URL}/icons/${id}`);
  return res.data;
};

// Get single subIcon by iconId and subIconId
export const getSubIconById = async (iconId, subIconId) => {
  const res = await axios.get(
    `${BASE_URL}/icons/${iconId}/subicons/${subIconId}`
  );
  return res.data;
};

// Create new icon
export const createIcon = async (iconData) => {
  const res = await axios.post(`${BASE_URL}/icons`, iconData);
  return res.data;
};

// Create new subIcon
export const createSubIcon = async (iconId, subIconData) => {
  const res = await axios.post(
    `${BASE_URL}/icons/${iconId}/subicons`,
    subIconData
  );
  return res.data;
};