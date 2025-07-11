import axios from "axios";

// Relative API path (works with Vite proxy)
const API_BASE = "/v1/report-config/column-mapping";

// Get all columns
export async function fetchColumns() {
  try {
    const res = await axios.get(API_BASE);
    const json = res.data;

    if (Array.isArray(json.data?.results)) {
      return json.data.results;
    }

    console.error("Unexpected API response format:", json);
    throw new Error("Invalid API response structure");
  } catch (error) {
    console.error("Fetch failed:", error);
    throw new Error("Fetch failed");
  }
}

// Create new column
export async function addColumn(newItem) {
  try {
    const res = await axios.post(API_BASE, newItem);
    return res.data;
  } catch (error) {
    console.error("Create failed:", error.response?.data || error.message);
    throw new Error("Create failed");
  }
}

// Update column (POST with ID in body)
export async function updateColumn(updatedItem) {
  try {
    console.log("📦 Updating Column:", updatedItem);
    const res = await axios.post(API_BASE, updatedItem);
    return res.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    throw new Error("Update failed");
  }
}

// Delete column by ID
export async function deleteColumn(id) {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    throw new Error("Delete failed");
  }
}
