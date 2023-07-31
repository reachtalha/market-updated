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

import { Pencil, Trash2 } from 'lucide-react';
import ImageWithFallback from '@/components/common/FallbackImage';
import { Input } from '@/components/ui/input';

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
    <div className="rounded-md border mt-5">
      <div className="p-5">
        <Input type="search" placeholder="search" className="w-[20%]" />
      </div>
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
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="capitalize">
                      <div className="flex flex-row gap-x-4 items-center">
                        {cell.column.columnDef.header === 'Name' && (
                          <ImageWithFallback
                            src={cell.row.original.cover}
                            alt={cell.row.original.name}
                            width={20}
                            height={20}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  );
                })}
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
