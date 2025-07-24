import axios from "axios";
import api from "../api/api";
import getAPIMap from "../api/ApiUrls";

// ✅ Fetch all config columns (no pagination)
export async function fetchColumns() {
  try {
    const response = await api.get(getAPIMap("config"));
    console.log("Fetched columns full response:", response.data);
    const results = response.data?.data?.results || [];
    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error("❌ Fetch failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Fetch with pagination
export async function fetchColumWithPagination(pageIndex = 0, pageSize = 3) {
  try {
    const url = `${getAPIMap("config")}?page=${pageIndex + 1}&limit=${pageSize}`;
    const response = await api.get(url);
    console.log("Fetched columns full response:", response.data);
    const results = response.data?.data?.results || [];
    return {
      data: Array.isArray(results) ? results : [],
      total: response?.data?.data?.totalResults || 0,
    };
  } catch (error) {
    console.error("❌ Fetch failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Add new config
export async function addColumn(data) {
  try {
    const response = await api.post(getAPIMap("config"), data);
    return response.data;
  } catch (error) {
    console.error("❌ Add failed:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Update column
export async function fetchColumn(id) {
  const url = getAPIMap("config") + `/${id}`;
  const response = await axios.get(url);
  return response.data?.data; 
}


// ✅ updateColumn function as per your format
export async function updateColumn(options) {
  const url = getAPIMap("config") + `/${options.id}`;
  const response = await axios.put(url, options);
  return response.data;
}

// ✅ Delete config
export async function deleteColumn(id) {
  try {
    const url = `${getAPIMap("config")}/${id}`;
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("❌ Delete failed:", error.response?.data || error.message);
    throw error;
  }
}
