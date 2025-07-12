// src/Ty-Mapping/column-create.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addColumn } from "./column-data";

function ColumnCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    label: "",
    value: "",
    type: "",
    enable: false,
  });

  const save = async () => {
    if (!form.label || !form.value || !form.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("📝 Submitting column form:", form);
      await addColumn(form);
      alert("✅ Column created successfully!");
      navigate("/column-type/column-show");
    } catch (err) {
      console.error("❌ Failed to create column:", err.response?.data || err.message);
      alert("❌ Failed to create column. Check console for more details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Column</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
            placeholder="Enter label name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <input
            type="text"
            name="value"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
            placeholder="Enter column value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select Type --</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enable"
            checked={form.enable}
            onChange={(e) => setForm({ ...form, enable: e.target.checked })}
            className="h-4 w-4 text-violet-600"
          />
          <label htmlFor="enable" className="text-gray-700">Enable</label>
        </div>

        <div className="text-right">
          <button
            onClick={save}
            className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColumnCreate;
