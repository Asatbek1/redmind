import { useState, useMemo } from "react";
import {
  Container,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useTable } from "react-table";
import { data } from "../utils/data";
import FooterPrice from "./FooterPrice";
import Price from "./Price";
import TableCell from "./TableCell";
import Total from "./Total";

const CustomTable = () => {
  const [tableData] = useState(data);

  const columns = useMemo(
    () => [
      {
        Header: "Store",
        accessor: (data) => data.store.name,
        Footer: "Totals",
      },
      ...data.map((item, index) => ({
        Header: item.months[index].name,
        accessor: (data) => data.months[index].id,
        Cell: (cell) => {
          return cell.column.Header ? (
            <TableCell value={0} id={cell.value} storeId={cell.column.Header} />
          ) : null;
        },
        Footer: ({ rows, column }) => {
          const keys = rows.map((item) => item.values.Total);
          return column.Header ? (
            <FooterPrice header={column.Header} keys={keys} index={index} />
          ) : null;
        },
      })),
      {
        Header: "Total",
        accessor: (data) => data.months.map((item) => item.id),
        Cell: ({ row, rows, columns, column }) => (
          <Total original={row.original} />
        ),
        Footer: (props) => <Price />,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <Container component={Paper}>
      <MuiTable
        sx={{ minWidth: 1250, display: "flex" }}
        {...getTableProps()}
        aria-label="simple table"
      >
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              sx={{
                display: "flex ",
                flexDirection: "column",
              }}
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <MuiTableCell {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </MuiTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                sx={{
                  display: "flex ",
                  flexDirection: "column",
                  float: "left",
                }}
                {...row.getRowProps()}
                key={row.id}
              >
                {row.cells.map((cell) => (
                  <MuiTableCell
                    sx={{ width: "60px", marginTop: "4px" }}
                    {...cell.getCellProps()}
                    key={cell.id}
                  >
                    {cell.render("Cell")}
                  </MuiTableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              sx={{
                display: "flex ",
                flexDirection: "column",
              }}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((column) => (
                <MuiTableCell {...column.getHeaderProps()} key={column.id}>
                  {column.render("Footer")}
                </MuiTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
      </MuiTable>
    </Container>
  );
};

export default CustomTable;
