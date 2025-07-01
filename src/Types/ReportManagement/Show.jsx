import React from "react";
import ReportTable from "../../Table/report-table";

function Show() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Report Types / Show</h2>
      <ReportTable showActions={true} />
    </div>
  );
}

export default Show;
