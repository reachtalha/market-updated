'use client';
import { Product, columns } from './columns';
import { DataTable } from './data-table';
import { getDocs, doc, collection, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { useState, useEffect } from 'react';
import useSortingStore from '@/state/useSortingStore';
async function getData(): Promise<Product[]> {
  const q = query(collection(db, 'products'), where('uid', '==', auth.currentUser?.uid));
  const querySnapshot = await getDocs(q);

  const products: Product[] = [];

  querySnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      status: doc.data().status,
      quantity: doc.data().SKU.reduce((acc: any, curr: any) => acc + curr.quantity, 0),
      price:
        '$ ' +
        doc
          .data()
          .SKU.sort((a: any, b: any) => a.price - b.price)[0]
          .price.toFixed(2),
      date: doc.data().submittedAt.toDate().toLocaleDateString(),
      cover: doc.data().coverImage
    });
  });

  return products;
}

export default function DemoPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [reRender, setReRender] = useState(false);
  const sortSellerProductsBy = useSortingStore((state: any) => state.sortSellerProductsBy);
  const { data, isLoading, error } = useSwr('sellerProducts', getData);

  useEffect(() => {
    if (!data) return;
    if (search.trim() === '') return setFilteredProducts(data);
    setFilteredProducts(
      data.filter(
        (product: any) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.type.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    console.log('We are ');
    if (!data) return;

    switch (sortSellerProductsBy) {
      case 'name':
        setFilteredProducts(
          [...filteredProducts].sort((a: any, b: any) => a.name.localeCompare(b.name))
        );
        setReRender(!reRender);
        break;
      case 'type':
        setFilteredProducts(
          [...filteredProducts].sort((a: any, b: any) => a.type.localeCompare(b.type))
        );

        break;
      case 'quantity':
        setFilteredProducts(
          [...filteredProducts].sort((a: any, b: any) => b.quantity - a.quantity)
        );

        break;
      default:
        console.log('default');
        setFilteredProducts(data);
    }
  }, [data, sortSellerProductsBy]);

  console.log(filteredProducts);
  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <Error />;

  return (
    <div className="container mx-auto py-20">
      <Title title="Products" />
      <DataTable search={search} setSearch={setSearch} columns={columns} data={filteredProducts} />
    </div>
  );
}
