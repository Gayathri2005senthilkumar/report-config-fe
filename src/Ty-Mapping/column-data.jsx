// src/Ty-Mapping/column-data.jsx
import axios from "axios";
import getAPIMap from "../ApiUrls";

// ✅ Fetch all columns
export async function fetchColumns() {
  try {
    const response = await axios.get(getAPIMap("columnMapping"));
    return response.data;
  } catch (error) {
    console.error("❌ Fetch failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Add new column
export async function addColumn(data) {
  try {
    const cleanData = {
      label: data.label,
      value: data.value,
      type: data.type,
      enable: data.enable,
    };

    console.log("📤 Sending column data:", cleanData);
    const response = await axios.post(getAPIMap("columnMapping"), cleanData);
    return response.data;
  } catch (error) {
    console.error("❌ Add failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Update column
export async function updateColumn(data) {
  try {
    const cleanData = {
      id: data.id,
      label: data.label,
      value: data.value,
      type: data.type,
      enable: data.enable,
    };

    console.log("📤 Updating column:", cleanData);
    const response = await axios.post(getAPIMap("columnMapping"), cleanData);
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
