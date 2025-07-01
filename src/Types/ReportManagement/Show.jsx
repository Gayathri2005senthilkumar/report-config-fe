import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reportData from "../../Table/report-data";

function Show() {
  const navigate = useNavigate();
  const [data, setData] = useState([...reportData]);

  const handleDelete = (id) => {
    const updatedData = data.filter((r) => r.id !== id);
    setData(updatedData);

    const index = reportData.findIndex((r) => r.id === id);
    if (index !== -1) {
      reportData.splice(index, 1);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report Types / Show</h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Enable</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No reports available.
                </td>
              </tr>
            ) : (
              data.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition border-t border-gray-200"
                >
                  <td className="py-3 px-4">{report.id}</td>
                  <td className="py-3 px-4">{report.name}</td>
                  <td className="py-3 px-4 text-center">{report.enabled ? "Yes" : "No"}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/report-types/edit/${report.id}`)}
                      className="px-3 py-1 text-sm border border-violet-500 text-violet-700 bg-white rounded hover:bg-violet-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="px-3 py-1 text-sm border border-red-500 text-red-600 bg-white rounded hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Show;
