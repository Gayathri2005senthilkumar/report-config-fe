import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TableFooter,
  Pagination,
  Toolbar,
} from "@mui/material";
import styled from "@emotion/styled";
import { tablePaginationClasses } from "@mui/material/TablePagination";

const TablePaginationRoot = styled(TableCell, {
  name: "MuiTablePagination",
  slot: "Root",
})(() => ({
  overflow: "auto",
  "&:last-child": {
    padding: 0,
  },
}));

const TablePaginationToolbar = styled(Toolbar, {
  name: "MuiTablePagination",
  slot: "Toolbar",
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.actions}`]: styles.actions,
    ...styles.toolbar,
  }),
})(() => ({
  minHeight: 52,
  paddingRight: 2,
}));

const TablePaginationSpacer = styled("div", {
  name: "MuiTablePagination",
  slot: "Spacer",
})({
  flex: "1 1 auto",
});

export function TanStackTable({
  columns,
  data,
  pagination,
  pageCount,
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
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  <strong>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </strong>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePaginationRoot colSpan={1000}>
              <TablePaginationToolbar>
                <TablePaginationSpacer />
                <Pagination
                  count={pageCount}
                  page={pagination.pageIndex + 1}
                  onChange={(_, page) =>
                    onPaginationChange({ ...pagination, pageIndex: page - 1 })
                  }
                  color="primary"
                  shape="rounded"
                  variant="outlined"
                  showFirstButton
                  showLastButton
                />
              </TablePaginationToolbar>
            </TablePaginationRoot>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
