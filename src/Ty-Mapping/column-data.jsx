// src/Ty-Mapping/column-data.jsx
import axios from "axios";
import api from "../api/api";
import getAPIMap from "../api/ApiUrls";

// ✅ Fetch all columns
export async function fetchColumns() {
  try {
    const response = await axios.get(getAPIMap("columnMapping"));
    console.log("Fetched columns:", response.data); // Debug log
    return response.data.data || []; // Ensure we return the array
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
// ✅ Update column
export async function updateColumn(data) {
  try {
    const cleanData = {
      label: data.label,
      value: data.value,
      type: data.type,
      enable: data.enable,
    };

    const response = await axios.put(
      `${getAPIMap("columnMapping")}/${data.id}`, // ✅ use PUT with ID
      cleanData
    );

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
