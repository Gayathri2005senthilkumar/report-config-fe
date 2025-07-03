import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnTable from "./column-table";
import { getColumns } from "./column-data";

function ColumnShow() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const allRows = getColumns();

  // First apply filter (enabled/disabled/all)
  let filteredRows = allRows.filter((row) => {
    if (filter === "enabled") return row.enable === true;
    if (filter === "disabled") return row.enable === false;
    return true;
  });

  // Then apply global search
  filteredRows = filteredRows.filter((row) => {
    const search = searchTerm.toLowerCase();
    return (
      row.label.toLowerCase().includes(search) ||
      row.value.toLowerCase().includes(search) ||
      row.type.toLowerCase().includes(search)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Column Mapping / Show
      </h2>

      {/* Top controls: search, filter, create new */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by label, value, or type"
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-3">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-violet-500 text-violet-600 font-semibold px-4 py-2 rounded hover:bg-violet-100"
          >
            <option value="all">Filter</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          {/* Create New Button */}
          <button
            className="border border-violet-500 bg-white text-violet-600 font-semibold px-6 py-2 rounded hover:bg-violet-100"
            onClick={() => navigate("/column-type/column-create")}
          >
            Create New
          </button>
        </div>
      </div>

      {/* Table */}
      <ColumnTable rows={filteredRows} />
    </div>
  );
}

export default ColumnShow;
