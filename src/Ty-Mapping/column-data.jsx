const API_BASE = "/api/v1/report-config/column-mapping";

// GET all columns
export async function fetchColumns() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Fetch failed");

  const json = await res.json();
  if (Array.isArray(json.data?.results)) {
    return json.data.results;
  }

  console.error("Unexpected API response format:", json);
  throw new Error("Invalid API response structure");
}

//  CREATE a column
export async function addColumn(newItem) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Create failed:", errorText);
    throw new Error("Create failed");
  }

  return res.json();
}

// UPDATE column using same POST API with id
export async function updateColumn(updatedItem) {
  console.log("📦 Updating Column with ID:", updatedItem.id);
  console.log("Payload:", updatedItem);

  const res = await fetch(API_BASE, {
    method: "POST", // Same as create
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem), // id included here
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Update failed. Server response:", errorText);
    throw new Error("Update failed");
  }

  return res.json();
}

// DELETE
export async function deleteColumn(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(" Delete failed:", errorText);
    throw new Error("Delete failed");
  }
}
