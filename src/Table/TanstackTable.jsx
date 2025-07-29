import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";

export function TanStackTable({
  columns,
  data,
  pagination,
  onPaginationChange,
  pageCount,
  isLoading,
  totalItems,
  onRowClick, // ✅ Accept row click handler
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange,
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ cursor: onRowClick ? "pointer" : "default" }}
                onClick={() => onRowClick?.(row.original)} // ✅ Full row data
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* ✅ Pagination */}
      <TablePagination
        component="div"
        count={totalItems}
        page={pagination.pageIndex}
        onPageChange={(e, newPage) =>
          onPaginationChange({ ...pagination, pageIndex: newPage })
        }
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={(e) =>
          onPaginationChange({
            ...pagination,
            pageSize: parseInt(e.target.value, 10),
            pageIndex: 0,
          })
        }
        rowsPerPageOptions={[3, 5, 10, 25, 50]}
      />
    </TableContainer>
  );
}
