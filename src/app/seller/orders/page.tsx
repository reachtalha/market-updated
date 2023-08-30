'use client';
import { auth, db } from '@/lib/firebase/client';
import { columns } from './columns';
import { DataTable } from './data-table';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
import { formatCurrency } from '@/utils/formatters';

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

    if (products.length > 0) {
      orders.push({
        id: doc.id,
        name: doc.data().shippingAddress.firstName,
        email: doc.data().shippingAddress.email,
        status: doc.data().status ?? 'processing',
        price: formatCurrency(doc.data().total),
        address: doc.data().shippingAddress.address,
        placedAt: doc.data().timeStamp.toDate()
      });
    }
  });

  return orders;
};

export default function DemoPage() {
  const { data: orders, isLoading } = useSwr('sellerOrders', getOrders);

  if (isLoading) return <Loader className="flex items-center justify-center h-full w-full" />;

  return (
    <div className="container mx-auto py-20">
      <Title title="Orders" />
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
