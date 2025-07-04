import React from "react";
import { useNavigate } from "react-router-dom";

function ConfigType() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Config</h2>
      <div className="flex gap-4">
        <button
          className="border border-violet-500 bg-white text-black font-bold px-6 py-3 rounded hover:bg-violet-100"
          onClick={() => navigate("/config-type/config-show")}  // ✅ Corrected path
        >
          Show
        </button>
      </div>
    </div>
  );
}

export default ConfigType;
