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
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import ImageWithFallback from '@/components/common/FallbackImage';
import { Input } from '@/components/ui/input';
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import DropDown from './DropDown';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteImage from '@/utils/handlers/image/DeleteImage';
import { RECORDS_PER_PAGE } from './constants';
interface DataTableProps<TValue> {
  columns: ColumnDef<Product, TValue>[];
  data: Product[];
  totalRecords: number;
}

export function DataTable<TValue>({ columns, data, totalRecords }: DataTableProps<TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get('sort') || 'latest';
  const lastDoc = params.get('lastDoc') || null;
  const paramsQuery = params.get('query') || null;
  let page: any = params.get('page') || 0;
  const isNext = params.get('isNext');
  const [loading, setLoading] = useState(false);
  const [dataEnded, setDataEnded] = useState(false);

  useEffect(() => {
    if (!data || data.length < RECORDS_PER_PAGE) {
      setDataEnded(true);
    } else {
      setDataEnded(false);
    }
  }, [data]);

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
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (e) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (id: string) => {
    router.push(`/seller/products/edit/${id}`);
  };
  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      const query = e.target?.value;
      router.replace(
        `/seller/products?sort=${sort}&lastDoc=${lastDoc}&page=${page}&isNext=${isNext}&query=${query}`
      );
    }
  };
  return (
    <>
      <div className="rounded-md border mt-5">
        <div className="p-5 flex justify-between items-center">
          <Input type="search" onKeyDown={handleSearch} placeholder="Search" className="w-[20%]" />
          <DropDown sortBy={sort} />
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
                      <Button
                        disabled={loading}
                        variant="ghost"
                        onClick={() => handleEdit(row?.original?.id)}
                        className="rounded-full p-1 hover:-translate-y-[.15rem] transition-transform duration-200"
                      >
                        <Pencil size={15} />
                      </Button>
                      <Button
                        disabled={loading}
                        variant="ghost"
                        onClick={() => deleteProduct(row?.original?.id)}
                        className="rounded-full p-1 hover:-translate-y-[.15rem] transition-transform duration-200"
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="w-full">
                <TableCell colSpan={columns.length + 2} className="h-24 w-full text-center">
                  No Products Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={!lastDoc || lastDoc === 'null' || parseInt(page) === 0}
          variant="outline"
          size="sm"
          onClick={() => {
            const lastDoc: any = data[data.length - 1];
            page = parseInt(page) - 1;
            router.replace(
              `/seller/products?sort=${sort}&lastDoc=${lastDoc.id}&page=${page}&isNext=false&query=${paramsQuery}`
            );
          }}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={dataEnded || (page + 1) * RECORDS_PER_PAGE >= totalRecords}
          onClick={() => {
            const lastDoc = data[data.length - 1];
            page = parseInt(page) + 1;
            router.replace(
              `/seller/products?sort=${sort}&page=${page}&lastDoc=${lastDoc.id}&query=${paramsQuery}`
            );
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}
