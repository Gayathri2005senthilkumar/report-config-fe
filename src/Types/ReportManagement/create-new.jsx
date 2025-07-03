import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reportData from "../../Table/report-data";

function CreateNew() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleSave = () => {
    const newReport = {
      id: reportData.length + 1,
      name,
      enabled,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    reportData.push(newReport);
    navigate("/report-types/show"); 
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Report
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Name
          </label>
          <input
            type="text"
            placeholder="Enter report name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enable
          </label>
          <select
            value={enabled ? "yes" : "no"}
            onChange={(e) => setEnabled(e.target.value === "yes")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Save Report
        </button>
      </div>
    </div>
  );
}

export default CreateNew;
