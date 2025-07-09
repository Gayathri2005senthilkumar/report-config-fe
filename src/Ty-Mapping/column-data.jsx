const API_BASE = "/api/v1/report-config/column-mapping";

// ✅ GET all columns
export async function fetchColumns() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Fetch failed");

  const json = await res.json();
  console.log("API JSON response:", JSON.stringify(json, null, 2));

  // Handle expected format: { data: { results: [...] } }
  if (Array.isArray(json.data?.results)) {
    return json.data.results;
  }

  console.error("❌ Unexpected API response format:", json);
  throw new Error("Invalid API response structure");
}

// ✅ POST a new column
export async function addColumn(newItem) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Create failed. Server response:", errorText);
    throw new Error("Create failed");
  }

  return res.json();
}

// ✅ PUT (update) a column
export async function updateColumn(updatedItem) {
  const res = await fetch(`${API_BASE}/${updatedItem.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Update failed. Server response:", errorText);
    throw new Error("Update failed");
  }

  return res.json();
}

// ✅ DELETE a column
export async function deleteColumn(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Delete failed. Server response:", errorText);
    throw new Error("Delete failed");
  }
}
