// src/Types/ReportManagement/Edit.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reportData from "../../Table/report-data";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reportIndex = reportData.findIndex((r) => r.id === parseInt(id));
  const report = reportData[reportIndex];

  const [name, setName] = useState(report.name);
  const [enabled, setEnabled] = useState(report.enabled);
  const [createdAt, setCreatedAt] = useState(report.createdAt || "");
  const [updatedAt, setUpdatedAt] = useState(report.updatedAt || "");

  const handleSave = () => {
    reportData[reportIndex] = {
      ...reportData[reportIndex],
      name,
      enabled,
      createdAt,
      updatedAt,
    };
    navigate("/report-types/show");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Report</h2>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Enable Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Enable:</label>
        <select
          value={enabled ? "yes" : "no"}
          onChange={(e) => setEnabled(e.target.value === "yes")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Created At Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Created At:</label>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Updated At Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Updated At:</label>
        <input
          type="date"
          value={updatedAt}
          onChange={(e) => setUpdatedAt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
      >
        Save
      </button>
    </div>
  );
}

export default Edit;
