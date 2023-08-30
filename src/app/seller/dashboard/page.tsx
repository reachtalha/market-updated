'use client';

import useSWR from 'swr';
import { db, auth } from '@/lib/firebase/client';
import { getDocs, query, collection, where, limit } from '@firebase/firestore';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentSales } from '@/components/modules/Seller/Dashboard/RecentSales';
import Overview from '@/components/modules/Seller/Dashboard/Overview';

import { formatCurrency, formatDate, formatMonth } from '@/utils/formatters';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

import Products from '@/assets/icons/system/Products';
import Cart from '@/assets/icons/system/Cart';

export default function Home() {
  const {
    data: analytics,
    error,
    isLoading
  } = useSWR('dashboard', async () => {
    let recentSales: any = [];
    let totalSales = 0;
    let totalProducts = 0;
    let totalOrders = 0;
    const productSnap = await getDocs(
      query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`), limit(1))
    );
    const shopId = productSnap.docs[0]?.id;
    const orderSnap = await getDocs(
      query(collection(db, 'orders'), where('shops', 'array-contains', `${shopId}`))
    );

    totalProducts = productSnap.docs[0]?.data()?.noOfProducts;
    let activeOrders = 0;
    orderSnap.forEach((order) => {
      totalOrders++;
      if (order.data().status === 'processing') activeOrders++;
      recentSales.push({
        id: order.id,
        firstName: order.data().shippingAddress.firstName,
        lastName: order.data().shippingAddress.lastName,
        email: order.data().shippingAddress.email ?? '',
        photoURL: order.data().photoURL ?? '',
        amount: order.data().total,
        time: formatDate(order.data().timeStamp.seconds * 1000),
        month: formatMonth(order.data().timeStamp.seconds * 1000),
        status: order.data().status ?? 'Processing'
      });
      order.data().items.map((item: any) => {
        if (item.shopId === shopId) {
          totalSales += Number(item.selectedVariant.price) * parseInt(item.quantity);
        }
      });
    });
    return {
      totalSales,
      totalProducts,
      totalOrders,
      recentSales,
      activeOrders
    } as any;
  });
  if (isLoading) {
    return <Loader className="h-full w-full grid place-content-center" />;
  }
  if (error) {
    return <Error className="h-full w-full grid place-content-center" />;
  }

  return (
    <main className="p-3 md:p-5 lg:p-8 space-y-4">
      <h1 className="text-xl font-semibold">Greeting, {auth.currentUser?.displayName}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-neutral-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalSales)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Products className="w-5 h-5 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Cart className="w-5 h-5 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeOrders}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview sales={analytics.recentSales} />
        <RecentSales sales={analytics.recentSales} />
      </div>
    </main>
  );
}
