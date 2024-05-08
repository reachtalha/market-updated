'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
export type Product = {
  id: string;
  name: string;
  type: string;
  status: string;
  quantity: number;
  price: string;
  date: string;
  cover: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },

  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },

  {
    accessorKey: 'date',
    header: 'Date'
  }
];
