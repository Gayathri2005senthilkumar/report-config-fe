import React from "react";
import { useNavigate } from "react-router-dom";
import ReportTable from "../../Table/report-table";

function List() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Types / List</h2>

      <div className="flex gap-4 mb-4">
        <button
          className="border border-violet-500 bg-white text-violet-700 font-bold px-6 py-3 rounded hover:bg-violet-100"
          onClick={() => navigate("/report-types/create-new")}
        >
          Create New
        </button>
      </div>

      <ReportTable />
    </div>
  );
}

export default List;
