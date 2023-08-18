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

import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-hot-toast';

// Rest of your email sending code

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

  async function generateRandomPassword() {
    const length = Math.floor(Math.random() * 3) + 10; // Random length between 10 and 12
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      const docRef = await getDoc(doc(db, 'waiting-list', id));

      if (!docRef.exists()) {
        toast.error('User not found in the waiting list. Please refresh the page and try again.');
        return;
      }
      const user = docRef.data();
      const randomPassword = await generateRandomPassword();
      await axios.post('/api/auth/register', {
        name: user.name,
        email: user.email,
        password: randomPassword,
        role: user.role
      });
      await Promise.all([
        deleteDoc(doc(db, 'waiting-list', id)),
        axios.post('/api/mail/send', {
          name: user.name,
          email: user.email,
          password: randomPassword
        })
      ]);
      toast.success('An email with account details has been sent to the user.');
      window.location.reload();
    } catch (error: any) {
      toast.error('An error occurred while processing your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-md w-full border">
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
                <TableCell>
                  <Button disabled={loading} onClick={() => handleApprove(row?.original?.id)}>
                    Approve
                  </Button>
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
