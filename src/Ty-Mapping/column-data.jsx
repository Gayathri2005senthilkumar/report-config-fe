import axios from "axios";
import getAPIMap from "../ApiUrls"; // If you placed ApiUrls.js directly under src

// Fetch all columns
export async function fetchColumns() {
  try {
    const response = await axios.get(getAPIMap("columnMapping"));
    return response.data;
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    throw error;
  }
}

// Add a new column
export async function addColumn(data) {
  try {
    // Only send required fields
    const cleanData = {
      label: data.label,
      value: data.value,
      type: data.type,
      enable: data.enable,
    };

    const response = await axios.post(getAPIMap("columnMapping"), cleanData);
    return response.data;
  } catch (error) {
    console.error("❌ Add failed:", error);
    throw error;
  }
}

// Update existing column
export async function updateColumn(data) {
  try {
    const cleanData = {
      id: data.id,
      label: data.label,
      value: data.value,
      type: data.type,
      enable: data.enable,
    };

    const response = await axios.post(getAPIMap("columnMapping"), cleanData);
    return response.data;
  } catch (error) {
    console.error("❌ Update failed:", error);
    throw error;
  }
}

// Delete a column by ID
export async function deleteColumn(id) {
  try {
    const response = await axios.delete(`${getAPIMap("columnMapping")}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Delete failed:", error);
    throw error;
  }
}
