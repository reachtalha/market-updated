'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Product } from './columns';

import { Pencil, Trash2 } from 'lucide-react';
import ImageWithFallback from '@/components/common/FallbackImage';
import { Input } from '@/components/ui/input';
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  limit,
  where,
  collection,
  getDoc,
  updateDoc,
  increment,
  collectionGroup
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

import { useRouter } from 'next/navigation';
import SortByDropdown from '@/components/common/SortByDropdown';
import { useEffect, useState } from 'react';
import DeleteImage from '@/utils/handlers/image/DeleteImage';
import { promise } from 'zod';
import useLocale from '@/hooks/useLocale';

interface DataTableProps<TValue> {
  columns: ColumnDef<Product, TValue>[];
  data: Product[];
  search: string;
  setSearch: (value: string) => void;
}

export function DataTable<TValue>({ columns, data, search, setSearch }: DataTableProps<TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      //get product details
      const productRef = doc(db, 'products', id);
      const productDoc = await getDoc(productRef);
      const { shopId, moreImages } = productDoc.data() as any;

      //delete product from wishlist
      const wishListQuery = await getDocs(
        query(collection(db, 'wishlist'), where('productIds', 'array-contains', id))
      );

      wishListQuery.docs.forEach((d) => {
        console.log(d.data());
        updateDoc(doc(db, 'wishlist', `${d.id}`), {
          productIds: d.data().productIds.filter((i: string) => i !== id)
        });
      });

      // delete product from cart
      const querySnapShot = await getDocs(query(collection(db, 'cart')));
      Promise.all([
        querySnapShot.forEach(async (d) => {
          // Reference to the "items" subcollection of the specific cart
          const itemsCollectionRef = await getDocs(
            query(collection(db, 'cart', d.id, 'items'), where('productId', '==', id))
          );

          Promise.all([
            itemsCollectionRef.docs.forEach(async (itemDoc) => {
              await deleteDoc(doc(db, 'cart', d.id, 'items', `${itemDoc.id}`));
            })
          ]);
        })
      ]);

      //delete product
      await deleteDoc(doc(db, 'products', id));

      //update shop
      await updateDoc(doc(db, 'shops', shopId), {
        noOfProducts: increment(-1)
      });

      //delete images
      moreImages.forEach(async (i: string) => {
        await DeleteImage({ imageUrl: i });
      });

      await Promise.all([moreImages]);

      toast.success('Product Successfully Deleted');
      mutate('sellerProducts');
    } catch (e) {
      console.log(e);
      console.log('Error occured');
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (id: string) => {
    router.push(`/${locale}/seller/products/edit/${id}`);
  };
  return (
    <div className="rounded-md border mt-5">
      <div className="p-5 flex justify-between items-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="search"
          className="w-[20%]"
        />
        <SortByDropdown type="seller-product" />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any, index: number) => (
            <TableRow key={index}>
              <TableHead>#</TableHead>
              {headerGroup.headers.map((header: any, index: number) => {
                return (
                  <TableHead key={index}>
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
            table.getRowModel().rows.map((row: any, index: number) => (
              <TableRow key={index} data-state={row.getIsSelected() && 'selected'}>
                <TableCell>{row.index + 1}</TableCell>
                {row.getVisibleCells().map((cell: any, index: number) => {
                  return (
                    <TableCell key={index} className="capitalize">
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
                <TableCell key={index}>
                  <div className="flex flex-row gap-x-4">
                    <Pencil
                      size={15}
                      className={loading ? 'pointer-events-none' : 'cursor-pointer'}
                      onClick={() => handleEdit(row?.original?.id)}
                    />
                    <Trash2
                      size={15}
                      color="#C51605"
                      className={loading ? 'pointer-events-none' : 'cursor-pointer'}
                      onClick={() => deleteProduct(row?.original?.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Products Found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
