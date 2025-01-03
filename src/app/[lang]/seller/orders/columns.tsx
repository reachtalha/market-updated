'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
export type Order = {
  id: string;
  name: string;
  email: string;
  status: string;
  address: string;
  price: string;
  placedAt: string;
  shopId: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select'
  },
  {
    accessorKey: 'name',
    header: 'Name',

    cell: ({ row }) => {
      const name: string = String(row.getValue('name'));
      return <span className="capitalize">{name}</span>;
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = String(row.getValue('status'));
      return (
        <div
          className={` rounded-xl p-1.5 px-3 w-fit h-fit capitalize flex items-center font-medium justify-center ${
            status.toLowerCase() === 'complete'
              ? 'bg-green-100 text-green-500'
              : status.toLowerCase() === 'processing'
              ? 'bg-yellow-100 text-yellow-500'
              : 'bg-red-100 text-red-500'
          }`}
        >
          <span>{status}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'placedAt',
    header: 'Placed At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('placedAt'));
      return <span>{date.toDateString()}</span>;
    }
  }
];
