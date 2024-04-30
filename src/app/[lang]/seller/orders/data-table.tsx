'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Order } from './columns';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { RECORDS_PER_PAGE } from './constants';

interface DataTableProps<TValue> {
  columns: ColumnDef<Order, TValue>[];
  data: Order[];
  search: string;
  page: number;
  total: number;
  setSearch: (value: string) => void;
  setPage: Function;
}

export function DataTable<TValue>({
  columns,
  data,
  search,
  page,
  total,
  setSearch,
  setPage
}: DataTableProps<TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
      <div className="rounded-md border mt-5">
        <div className="p-5">
          <Input
            type="search"
            placeholder="Search"
            className="w-[20%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <MoveRight
                      size={15}
                      onClick={() => {
                        router.push(`/seller/orders/${row?.original?.id}`);
                      }}
                      className="cursor-pointer hover:translate-x-[.15rem] transition-transform duration-200"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev: any) => prev - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev: any) => prev + 1)}
          disabled={(page + 1) * RECORDS_PER_PAGE > total}
        >
          Next
        </Button>
      </div>
    </>
  );
}
