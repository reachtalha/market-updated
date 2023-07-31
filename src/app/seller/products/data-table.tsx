"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "./columns";

import { Pencil, Trash2 } from "lucide-react";

interface DataTableProps<TValue> {
  columns: ColumnDef<Product, TValue>[];
  data: Product[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-md border mt-5'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead>#</TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <TableCell>{row.index + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='capitalize'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell onClick={() => console.log(row?.original?.id)}>
                  <div className='flex flex-row gap-x-4'>
                    <Pencil size={15} className='cursor-pointer' />
                    <Trash2
                      size={15}
                      color='#C51605'
                      className='cursor-pointer'
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
