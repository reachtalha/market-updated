'use client';

import { useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mutate } from 'swr';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any;
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<any, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'blog-posts', id));
      mutate('manage-blogs');
      toast.success('Your Blog has been deleted');
    } catch (error: any) {
      toast.error('An error occurred while processing your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-md mx-auto w-full border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="w-20">
                  <div className="flex gap-x-2.5">
                    <Link href={`/blog/${row?.original?.id}`}>
                      <Button variant="default" disabled={loading}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      disabled={loading}
                      variant="destructive"
                      onClick={() => handleDelete(row?.original?.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
