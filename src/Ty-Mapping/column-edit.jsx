import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchColumns, updateColumn } from "./column-data";

function ColumnEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    label: "",
    value: "",
    type: "",
    enable: false,
  });

  // Fetch data for the current column
  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await fetchColumns();
        const current = allData.find((item) => String(item.id) === id);
        if (current) {
          setForm(current);
        } else {
          console.error("Item not found for ID:", id);
        }
      } catch (error) {
        console.error("❌ Failed to fetch item:", error);
      }
    }
    fetchData();
  }, [id]);

  // Update form values on change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save updated data
  const handleSave = async () => {
    try {
      await updateColumn({
        id: form.id,
        label: form.label,
        value: form.value,
        type: form.type,
        enable: form.enable,
      });
      alert("✅ Updated successfully!");
      navigate("/column-type/column-show");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Update failed. Check console for details.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Column</h2>

      <div className="flex flex-col gap-3">
        <input
          name="id"
          value={form.id}
          readOnly
          className="border p-2 bg-gray-100 text-gray-500"
        />

        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          placeholder="Label"
          className="border p-2 rounded"
        />

        <input
          name="value"
          value={form.value}
          onChange={handleChange}
          placeholder="Value"
          className="border p-2 rounded"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          className="border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="enable"
            checked={form.enable}
            onChange={handleChange}
          />
          Enable
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ColumnEdit;
