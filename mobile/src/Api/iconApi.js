import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const BASE_URL = APP_CONFIG.contentApiUrl;

const isFormDataPayload = (data) =>
  data && typeof data.append === "function" && typeof data.getHeaders !== "function";

const parseFetchResponse = async (response) => {
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.response = { status: response.status, data };
    throw error;
  }

  return data;
};

const sendFormData = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    body,
  });

  return parseFetchResponse(response);
};

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

export const getMainCategories = async () => {
  const res = await axios.get(`${BASE_URL}/maincategories`);
  return res.data;
};

export const getIconsByMainCategoryId = async (mainCategoryId) => {
  const res = await axios.get(
    `${BASE_URL}/maincategories/${mainCategoryId}/icons`,
  );
  return res.data;
};

export const getTimePeriodsByMainCategoryId = async (mainCategoryId) => {
  const res = await axios.get(
    `${BASE_URL}/maincategories/${mainCategoryId}/timeperiods`,
  );
  return res.data;
};

export const getIconsByTimePeriodId = async (timePeriodId) => {
  const res = await axios.get(
    `${BASE_URL}/timeperiods/${timePeriodId}/icons`,
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
  if (isFormDataPayload(subIconData)) {
    return sendFormData(`${BASE_URL}/icons/${iconId}/subicons`, "POST", subIconData);
  }

  const res = await axios.post(
    `${BASE_URL}/icons/${iconId}/subicons`,
    subIconData,
  );
  return res.data;
};

// Update subIcon
export const updateSubIcon = async (subIconId, subIconData) => {
  if (isFormDataPayload(subIconData)) {
    return sendFormData(`${BASE_URL}/icons/subicons/${subIconId}`, "PUT", subIconData);
  }

  const res = await axios.put(
    `${BASE_URL}/icons/subicons/${subIconId}`,
    subIconData,
  );
  return res.data;
};

// Delete subIcon
export const deleteSubIcon = async (subIconId) => {
  const res = await axios.delete(`${BASE_URL}/icons/subicons/${subIconId}`);
  return res.data;
};

// Create new subSubIcon
export const createSubSubIcon = async (iconId, subIconId, subSubIconData) => {
  if (isFormDataPayload(subSubIconData)) {
    return sendFormData(
      `${BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons`,
      "POST",
      subSubIconData,
    );
  }

  const res = await axios.post(
    `${BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons`,
    subSubIconData,
  );
  return res.data;
};

// Update subSubIcon
export const updateSubSubIcon = async (subSubIconId, subSubIconData) => {
  if (isFormDataPayload(subSubIconData)) {
    return sendFormData(
      `${BASE_URL}/icons/subsubicons/${subSubIconId}`,
      "PUT",
      subSubIconData,
    );
  }

  const res = await axios.put(
    `${BASE_URL}/icons/subsubicons/${subSubIconId}`,
    subSubIconData,
  );
  return res.data;
};

// Delete subSubIcon
export const deleteSubSubIcon = async (subSubIconId) => {
  const res = await axios.delete(`${BASE_URL}/icons/subsubicons/${subSubIconId}`);
  return res.data;
};
