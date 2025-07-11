import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnTable from "./column-table";
import { fetchColumns, deleteColumn } from "./column-data";

function ColumnShow() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch columns on mount
  useEffect(() => {
    const loadColumns = async () => {
      try {
        const res = await fetchColumns();
        // ✅ Sort by ID ascending before setting
        const sorted = [...res].sort((a, b) => a.id - b.id);
        setData(sorted);
      } catch (err) {
        console.error(" Failed to fetch column data:", err);
      }
    };
    loadColumns();
  }, []);

  // Delete column by ID
  const handleDelete = async (id) => {
    try {
      await deleteColumn(id);
      setData((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      console.error(" Delete failed:", err);
    }
  };

  // Navigate to edit page
  const handleEdit = (row) => {
    navigate(`/column-type/column-edit/${row.id}`);
  };

  // Navigate to create page
  const handleCreate = () => {
    navigate("/column-type/column-create");
  };

  // Filter and search logic
  const filtered = data
    .filter((row) => {
      if (filter === "enabled") return row.enable === true;
      if (filter === "disabled") return row.enable === false;
      return true;
    })
    .filter((row) =>
      [row.label, row.value, row.type].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <div className="p-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by label, value or type"
          className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>

        <button
          onClick={handleCreate}
          className="border border-violet-600 text-violet-600 bg-white hover:bg-violet-600 hover:text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-200"
        >
          + Create New
        </button>
      </div>

      {/* Table */}
      <ColumnTable rows={filtered} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default ColumnShow;
