import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableFooter,
  TablePagination,
  Box,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
export function TanStackTable({
  columns,
  data,
  pagination,
  pageCount,
  totalItems,
  isLoading,
  onPaginationChange,
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id}>
                    <strong>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                    </strong>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
            <Box width="100%" display="flex" justifyContent="center" m={2}>
             <Pagination
          count={pageCount}
          page={pagination.pageIndex + 1}
          onChange={(_, page) =>
            onPaginationChange({ ...pagination, pageIndex: page - 1 })
          }
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
            {/* <TablePagination
              count={totalItems}
              page={pagination.pageIndex}
              rowsPerPage={pagination.pageSize}
              onPageChange={(_, newPage) =>
                onPaginationChange({ ...pagination, pageIndex: newPage })
              }
              onRowsPerPageChange={e =>
                onPaginationChange({
                  pageIndex: 0,
                  pageSize: parseInt(e.target.value, 10),
                })
              }
              rowsPerPageOptions={[5, 10, 20]}
              showFirstButton
              showLastButton
            /> */}
            </Box>
      </Table>
    </TableContainer>
  );
}
