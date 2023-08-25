'use client';

import { ColumnDef } from '@tanstack/react-table';

export type NewUser = {
  name: string;
  email: string;
  bio: string;
  socials: string[];
  isApproved: boolean;
};

export const columns: ColumnDef<NewUser>[] = [
  {
    accessorKey: 'id',
    header: 'User ID',
    cell: ({ row }) => {
      const id: string = String(row.getValue('id'));
      return <span className="capitalize">{id}</span>;
    }
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
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role: string = String(row.getValue('role'));
      return (
        <span className="capitalize px-2.5 rounded-full border  border-neutral-200 bg-neutral-100 py-1.5">
          {role}
        </span>
      );
    }
  }
];
