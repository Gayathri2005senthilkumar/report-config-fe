import axios from "axios";
import api from "../api/api";
import getAPIMap from "../api/ApiUrls";


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

export async function fetchColumn(id) {
  const url = getAPIMap("columnMapping") + `/${id}`;
  const response = await axios.get(url);
  return response.data;
}

// ✅ updateColumn function as per your format
export async function updateColumn(options) {
  const url = getAPIMap("columnMapping") + `/${options.id}`;
  const response = await axios.put(url, options);
  return response.data;
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
