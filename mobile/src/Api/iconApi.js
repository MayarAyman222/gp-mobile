import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = APP_CONFIG.contentApiUrl;

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
    `${BASE_URL}/icons/${iconId}/subicons/${subIconId}`,
  );
  return res.data;
};

// Get single subSubIcon by parent ids
export const getSubSubIconById = async (iconId, subIconId, subSubIconId) => {
  const res = await axios.get(
    `${BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons/${subSubIconId}`,
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
    subIconData,
  );
  return res.data;
};

// Create new subSubIcon
export const createSubSubIcon = async (iconId, subIconId, subSubIconData) => {
  const res = await axios.post(
    `${BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons`,
    subSubIconData,
  );
  return res.data;
};
