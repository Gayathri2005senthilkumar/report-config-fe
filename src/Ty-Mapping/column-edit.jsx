import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateColumn, fetchColumns } from "./column-data";

function ColumnEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    // Fetch all and find this column OR ideally fetch one item if backend allows
    fetchColumns().then((all) => {
      const found = all.find((col) => col.id == id);
      setForm(found);
    });
  }, [id]);

  const save = async () => {
    await updateColumn({ ...form, id });
    navigate("/column-type/column-show");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Column</h2>

      <input
        className="border w-full p-2 mb-4"
        value={form.label}
        onChange={(e) => setForm({ ...form, label: e.target.value })}
        placeholder="Label"
      />
      <input
        className="border w-full p-2 mb-4"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
        placeholder="Value"
      />
      <select
        className="border w-full p-2 mb-4"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="">-- Select Type --</option>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
      </select>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={form.enable}
          onChange={(e) => setForm({ ...form, enable: e.target.checked })}
        />
        <span className="ml-2">Enable</span>
      </label>

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}

export default ColumnEdit;
