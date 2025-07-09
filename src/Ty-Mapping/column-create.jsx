import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addColumn } from "./column-data";

function ColumnCreate() {
  const nav = useNavigate();
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
      await addColumn(form);
      nav("/column-type/column-show");
    } catch (err) {
      console.error("Failed to create column:", err);
      alert("Failed to create column. Check console for details.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Column</h2>

      <div className="mb-4">
        <label className="block mb-1">Label</label>
        <input
          className="border w-full p-2"
          name="label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Value</label>
        <input
          className="border w-full p-2"
          name="value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select
          className="border w-full p-2"
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">-- Select Type --</option>
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="enable"
          checked={form.enable}
          onChange={(e) => setForm({ ...form, enable: e.target.checked })}
        />
        <label htmlFor="enable" className="ml-2">Enable</label>
      </div>

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}

export default ColumnCreate;
