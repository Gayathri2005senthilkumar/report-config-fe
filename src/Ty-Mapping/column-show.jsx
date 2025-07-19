import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColumnTable from "./column-table";
import { fetchColumns, deleteColumn } from "./column-data";

function ColumnShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadColumns = async () => {
  try {
    const res = await fetchColumns();
    console.log("Loaded columns:", res);
    setRows(res); // ✅ this is already correct
  } catch (err) {
    console.error("Failed to fetch column data:", err);
    setRows([]);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this column?")) return;

    try {
      await deleteColumn(id);
      setRows((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete column.");
    }
  };

  useEffect(() => {
    loadColumns();
  }, [location.state]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Column Mappings</h2>
        <button
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          onClick={() => navigate("/column-type/column-form/create", { state: { from: "show" } })}
        >
          + Create New
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ColumnTable rows={rows} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default ColumnShow;