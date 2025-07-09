import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnTable from "./column-table";
import { fetchColumns, deleteColumn } from "./column-data";

function ColumnShow() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchColumns()
      .then(setData) 
      .catch((err) => {
        console.error("Failed to fetch column data:", err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteColumn(id);
      setData((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
const handleEdit = (row) => {
  navigate(`/column-type/column-edit/${row.id}`);
};


  const handleCreate = () => {
    navigate("/column-type/column-create"); 
  };

  const filtered = data
    .filter((r) => {
      if (filter === "enabled") return r.enable;
      if (filter === "disabled") return !r.enable;
      return true;
    })
    .filter((r) =>
      [r.label, r.value, r.type].some((str) =>
        str?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
        <button onClick={handleCreate}>Create New</button>
      </div>

      <ColumnTable
        rows={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ColumnShow;
