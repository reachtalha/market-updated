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

  let cancelTokenSource: CancelTokenSource | undefined;

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

  const handleRegistration = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);

      // Cancel any previous request before making a new one
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled');
      }

      // Create a new cancel token source
      cancelTokenSource = axios.CancelToken.source();

      await axios.post(
        '/api/auth/register',
        {
          name,
          email,
          password,
          role: 'influencer'
        },
        {
          cancelToken: cancelTokenSource.token
        }
      );

      toast.success('Expert Approved!');
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        toast.error(`Error!: ${error.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    const docRef = await getDoc(doc(db, 'waiting-list', id));


    if (docRef.exists()) {
      try {
        const user = docRef.data();
        const randomPassword = await generateRandomPassword();
        console.log(randomPassword);
        await handleRegistration(user.name, user.email, randomPassword);
        await axios.post('/api/mail/send', {
          name: user.name,
          email: user.email,
          password: randomPassword
        });
        toast.success('Email sent to user');
      } catch (error: any) {
        console.log(error);
        toast.error('An error occured');
      } finally {
        await deleteDoc(doc(db, 'waiting-list', id));
      }
    } else {
      toast.error('User does not exist');
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
                  <Button onClick={() => handleApprove(row?.original?.id)}>Approve</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
