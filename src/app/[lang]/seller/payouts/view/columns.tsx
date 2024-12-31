'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id: string = String(row.original.id);
      return <span className="">{id}</span>;
    }
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => {
      const currency: string = String(row.original.currency);
      return <span className="">{currency}</span>;
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.original.amount;
      return <span className="">{'$' + Number((amount / 100).toFixed(0))}</span>;
    }
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = String(row.original.status);
      return (
        <span className="capitalize px-2.5 rounded-full border  border-neutral-200 bg-neutral-100 py-1.5">
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: 'created',
    header: 'Created At',
    cell: ({ row }) => {
      const createdTimestamp = row.original.created;
      const createdDate = new Date(createdTimestamp * 1000);
      const formattedDate = `${createdDate.getDate()}/${
        createdDate.getMonth() + 1
      }/${createdDate.getFullYear()}`;
      return <span className="">{formattedDate}</span>;
    }
  }
];
