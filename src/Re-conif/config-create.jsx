import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import configData from "./config-data";

function ConfigCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    name: "",
    normalizedName: "",
    enable: false,
  });

  // Auto-generate next ID
  const generateId = () => {
    const ids = configData.map((item) => item.id);
    return Math.max(...ids, 0) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setForm((prev) => ({ ...prev, enable: e.target.checked }));
  };

  const handleSave = () => {
    const newItem = { id: generateId(), ...form };
    configData.push(newItem); // Save to shared data
    navigate("/config-type/config-show");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create New Config</h2>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Normalized Name</label>
        <input
          name="normalizedName"
          value={form.normalizedName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={form.enable}
            onChange={handleCheckbox}
            className="mr-2"
          />
          Enable
        </label>
      </div>

      <button
        onClick={handleSave}
        className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
      >
        Save
      </button>
    </div>
  );
}

export default ConfigCreate;
