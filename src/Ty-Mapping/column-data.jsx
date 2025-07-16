import axios from "axios";
import api from "../api/api";
import getAPIMap from "../api/ApiUrls";
import apiFunction from "../api/apiFunction";

// ✅ Fetch all columns
export async function fetchColumns() {
  try {
    const response = await axios.get(getAPIMap("columnMapping"));
    console.log("Fetched columns full response:", response.data);
    const results = response.data?.data?.results || [];
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error("❌ Fetch failed:", error.response?.data || error.message);
    throw error;
  }
}


// ✅ Add new column
export async function addColumn(data) {
  try {
    const response = await api.post(getAPIMap("columnMapping"), data);
    return response.data;
  } catch (error) {
    console.error("❌ Add failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Update column
// ✅ column-data.jsx

/// ✅ src/Ty-Mapping/column-data.jsx
export async function updateColumn(data) {
  try {
    const response = await apiFunction({
      url: "columnMapping", // ✅ static key — do NOT pass id in URL
      method: "post",        // ✅ as per backend, use POST
      data: {
        id: data.id,         // ✅ id sent in body
        label: data.label,
        value: data.value,
        type: data.type,
        enable: data.enable,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Update failed:", error.response?.data || error.message);
    throw error;
  }
}


// ✅ Delete column
export async function deleteColumn(id) {
  try {
    const response = await axios.delete(`${getAPIMap("columnMapping")}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Delete failed:", error.response?.data || error.message);
    throw error;
  }
}
