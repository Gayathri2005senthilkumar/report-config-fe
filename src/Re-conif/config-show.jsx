import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfigTable from "./config-table";
import initialData from "./config-data"; // Static mock data

function ConfigShow() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(initialData); // make it mutable

  // Search + Filter
  const filteredData = data.filter((row) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      row.title.toLowerCase().includes(search) ||
      row.name.toLowerCase().includes(search) ||
      row.normalizedName.toLowerCase().includes(search);

    const matchesFilter =
      filter === "all" ||
      (filter === "enabled" && row.enable) ||
      (filter === "disabled" && !row.enable);

    return matchesSearch && matchesFilter;
  });

  //  Deleting the item from table & source
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/config-type/config-edit/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Config / Show</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title, name, or normalized name"
          className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-violet-500 text-violet-600 font-semibold px-4 py-2 rounded hover:bg-violet-100"
          >
            <option value="all">Filter</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          <button
            className="border border-violet-500 bg-white text-violet-600 font-semibold px-6 py-2 rounded hover:bg-violet-100"
            onClick={() => navigate("/config-type/config-create")}
          >
            Create New
          </button>
        </div>
      </div>

      {/* Pass editable data to table */}
      <ConfigTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default ConfigShow;
