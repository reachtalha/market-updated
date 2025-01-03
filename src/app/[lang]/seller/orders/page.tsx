'use client';
import { auth, db } from '@/lib/firebase/client';
import { columns } from './columns';
import { DataTable } from './data-table';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
import { formatCurrency } from '@/utils/formatters';
import { useState, useEffect } from 'react';
import { RECORDS_PER_PAGE } from './constants';

const getOrders = async () => {
  let orders: any = [];
  const userId = auth.currentUser?.uid;
  let docSnapshot = await getDocs(query(collection(db, 'shops'), where('uid', '==', userId)));

  if (docSnapshot.docs.length < 1) {
    return [];
  }
  const shopId = docSnapshot.docs[0].id;

  docSnapshot = await getDocs(collection(db, 'orders'));
  docSnapshot.docs.forEach((doc) => {
    const products = doc.data().items.filter((item: any) => item.shopId === shopId);
    const totalPrice = products.reduce((acc: number, product: any) => {
      return acc + product.selectedVariant.price * product.quantity;
    }, 0);

    if (products.length > 0) {
      orders.push({
        id: doc.id,
        name: doc.data().shippingAddress.firstName,
        email: doc.data().shippingAddress.email,
        status: doc.data().status ?? 'processing',
        price: formatCurrency(totalPrice),
        address: doc.data().shippingAddress.address,
        placedAt: doc.data().timeStamp.toDate(),
        shopId
      });
    }
  });

  return orders;
};

export default function DemoPage() {
  const { data, isLoading } = useSwr(
    auth.currentUser ? ['seller-order', auth.currentUser?.uid] : null,
    getOrders
  );
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<any>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!data) return;
    if (search.trim() === '') return setFilteredOrders(data.slice(0, RECORDS_PER_PAGE));
    setFilteredOrders(
      data
        .filter(
          (order: any) =>
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.status.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, RECORDS_PER_PAGE)
    );
  }, [search]);

  useEffect(() => {
    if (!data) return;
    setFilteredOrders(data.slice(0, RECORDS_PER_PAGE));
  }, [data]);
  useEffect(() => {
    if (!data) return;
    setFilteredOrders(data.slice(page * RECORDS_PER_PAGE, (page + 1) * RECORDS_PER_PAGE));
  }, [page]);
  if (isLoading) return <Loader className="flex items-center justify-center h-full w-full" />;

  return (
    <div className="container mx-auto py-20">
      <Title title="Orders" />
      <DataTable
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        columns={columns}
        data={filteredOrders}
        total={filteredOrders.length}
      />
    </div>
  );
}
