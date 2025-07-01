import React from "react";

function ReportTypes() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Types</h2>
      <div className="flex gap-4">
        <button className="border border-violet-500 bg-white text-black font-bold px-6 py-3 rounded hover:bg-violet-100">
          List
        </button>
        <button className="border border-violet-500 bg-white text-black font-bold px-6 py-3 rounded hover:bg-violet-100">
          Show
        </button>
      </div>
    </div>
  );
}

export default ReportTypes;
