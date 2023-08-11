'use client';
import { auth, db } from '@/lib/firebase/client';
import { Order, columns } from './columns';
import { DataTable } from './data-table';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import { collection, getDocs, query, doc, getDoc, where } from 'firebase/firestore';
import Loader from '@/components/common/Loader';
const DummyData: Order[] = [
  {
    id: '1',
    name: 'Tony Stark',
    email: 'product1@example.com',
    status: 'pending',
    address: '123 Main St',
    price: '$19.99',
    placedAt: '2023-07-27T12:34:56'
  },
  {
    id: '2',
    name: 'Steve Rogers',
    email: 'product2@example.com',
    status: 'delivered',
    address: '456 Park Ave',
    price: '$29.99',
    placedAt: '2023-07-26T10:20:30'
  },
  {
    id: '3',
    name: 'Mark Ruffolow',
    email: 'product3@example.com',
    status: 'cancelled',
    address: '789 Elm St',
    price: '$9.99',
    placedAt: '2023-07-25T15:45:10'
  },
  {
    id: '4',
    name: 'Ant Man',
    email: 'product4@example.com',
    status: 'pending',
    address: '101 Market St',
    price: '$14.99',
    placedAt: '2023-07-24T18:12:30'
  },
  {
    id: '5',
    name: 'John Doe',
    email: 'product5@example.com',
    status: 'delivered',
    address: '202 Park Blvd',
    price: '$39.99',
    placedAt: '2023-07-23T09:00:45'
  },
  {
    id: '6',
    name: 'Thor',
    email: 'product6@example.com',
    status: 'cancelled',
    address: '303 Elm St',
    price: '$7.49',
    placedAt: '2023-07-22T14:55:20'
  },
  {
    id: '7',
    name: 'Peter Parker',
    email: 'product7@example.com',
    status: 'pending',
    address: '404 Oak Ave',
    price: '$24.99',
    placedAt: '2023-07-21T11:30:15'
  },
  {
    id: '8',
    name: 'Steven Strange',
    email: 'product8@example.com',
    status: 'delivered',
    address: '505 Pine St',
    price: '$19.99',
    placedAt: '2023-07-20T16:40:05'
  }
];

const getOrders = async () => {
  let orders: any = [];
  let structuredOrder: any = [];
  const userId = auth.currentUser?.uid;
  let docSnapshot = await getDocs(query(collection(db, 'shops'), where('uid', '==', userId)));

  const shopId = docSnapshot.docs[0].id;

  docSnapshot = await getDocs(collection(db, 'orders'));
  docSnapshot.docs.forEach((doc) => {
    const products = doc.data().items.filter((item: any) => item.shopId === shopId);

    if (products.length > 0) {
      orders.push({ id: doc.id, ...doc.data() });
    }
  });

  console.log(orders);

  await Promise.all(
    orders.map(async (order: any) => {
      const userDoc = await getDoc(doc(db, 'users', order.userId));
      if (userDoc.exists()) {
        structuredOrder.push({
          id: order.id,
          name: userDoc.data().name,
          email: userDoc.data().email,
          status: 'pending',
          price: order.total + '$',
          address: order.shippingAddress.address,
          placedAt: new Date(order.timeStamp || '12-4-2000')
        });
      }
    })
  );

  return structuredOrder;
};

export default function DemoPage() {
  const data = DummyData;

  const { data: orders, isLoading } = useSwr('sellerOrders', getOrders);

  if (isLoading) return <Loader className="flex items-center justify-center h-full w-full" />;

  return (
    <div className="container mx-auto py-20">
      <Title title="Orders" />
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
