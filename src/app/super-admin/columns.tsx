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
    header: 'Role'
  }
];
