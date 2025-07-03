import React from "react";
import { useNavigate } from "react-router-dom";

function ReportTypes() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Types</h2>
      <div className="flex gap-4 justify-end">
        <button
          className="border border-violet-500 bg-white text-black font-bold px-6 py-3 rounded hover:bg-violet-100"
          onClick={() => navigate("/report-types/Show")}
        >
          Show
        </button>
      </div>
    </div>
  );
}

export default ReportTypes;
