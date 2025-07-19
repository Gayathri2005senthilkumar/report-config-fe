import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { TanStackTable } from "@/Table/TanstackTable";
import { Button, Checkbox } from "@mui/material";
import {
  deleteColumn,
  fetchColumWithPagination,
} from "./column-data";


function ColumnShow() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this column?")) return;

    try {
      await deleteColumn(id);
      // setRows((prev) => prev.filter((item) => item.id !== id));
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete column.");
    }
  };

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("label", {
        header: "Label",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("value", {
        header: "Value",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("enable", {
        header: "Enable",
        cell: (info) => {
          return (
            <Checkbox
              checked={info.getValue()}
              // onChange={() => handleToggle(row)}
              color="primary"
              sx={{
                cursor: "auto",
                pointerEvents: 'none'
              }}
            />
          );
        },
      }),
       columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) =>{
          const row = info.row.original;
          return (<>
              <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate(`/column-type/column-form/${row.id}`, { state: row });
                    }}
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                    size="small"
                  >
                    Delete
                  </Button></>)
        },
      }),
    ];
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: () => fetchColumWithPagination(pagination.pageIndex, pagination.pageSize),
    keepPreviousData: true,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Column Mappings</h2>
        <button
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          onClick={() =>
            navigate("/column-type/column-form/create", {
              state: { from: "show" },
            })
          }
        >
          + Create New
        </button>
      </div>

      <TanStackTable
        columns={columns}
        data={data?.data ?? []}
        totalItems={data?.total ?? 0}
        pageCount={Math.ceil((data?.total ?? 0) / pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ColumnShow;
