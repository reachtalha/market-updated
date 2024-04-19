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

export default function Dashboard({ dictionary }: { dictionary: any }) {
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
    return (
      <main className="p-4 md:p-5 2xl:p-10 h-screen space-y-5 animate-pulse">
        <div className="h-12 w-44 bg-gray-300 rounded-md" />
        <div className="grid grid-cols-4 grid-rows-5 h-full w-full gap-5 py-5">
          <div className="col-span-1 col-start-1 col-end-2 row-start-1 w-full h-full bg-gray-300 rounded-lg row-end-2" />
          <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 w-full h-full bg-gray-300 rounded-lg" />
          <div className="col-span-1 col-start-3 col-end-4 row-start-1 row-end-2 w-full h-full bg-gray-300 rounded-lg" />
          <div className="col-span-1 col-start-4 col-end-5 row-start-1 row-end-2 w-full h-full bg-gray-300 rounded-lg" />
          <div className="row-start-2 row-end-6 col-start-1 col-end-3 w-full h-full bg-gray-300 rounded-lg" />
          <div className="row-start-2 row-end-6 col-start-3 col-end-5 w-full h-full bg-gray-300 rounded-lg" />
        </div>
      </main>
    );
  }
  if (error) {
    return <Error className="h-full w-full grid place-content-center" />;
  }

  return (
    <main className="p-4 md:p-5 2xl:p-10 h-screen space-y-5">
      <h1 className="text-xl font-semibold">
        {dictionary.seller.main.greetingLabel}, {auth.currentUser?.displayName}
      </h1>
      <div className="grid grid-cols-4 grid-rows-5 h-full w-full gap-5 py-5">
        <Card className="col-span-1 col-start-1 col-end-2 row-start-1 row-end-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm 2xl:text-lg font-medium">
              {dictionary.seller.main.totalRevenueLabel}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 2xl:h-8 2xl:w-8 text-neutral-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl 2xl:text-3xl font-bold">
              {formatCurrency(analytics.totalSales)}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm 2xl:text-lg  font-medium">
              {dictionary.seller.main.totalProductsLabel}
            </CardTitle>
            <Products className="w-5 h-5 2xl:h-8 2xl:w-8 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl 2xl:text-3xl font-bold">{analytics.totalProducts}</div>
          </CardContent>
        </Card>
        <Card className="col-span-1 col-start-3 col-end-4 row-start-1 row-end-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm 2xl:text-lg  font-medium">
              {dictionary.seller.main.totalOrdersLabel}
            </CardTitle>
            <Cart className="w-5 h-5 2xl:h-8 2xl:w-8 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl 2xl:text-3xl font-bold">{analytics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card className="col-span-1 col-start-4 col-end-5 row-start-1 row-end-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm 2xl:text-lg  font-medium">
              {dictionary.seller.main.activeOrdersLabel}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 2xl:h-7 2xl:w-7 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl 2xl:text-3xl font-bold">{analytics.activeOrders}</div>
          </CardContent>
        </Card>
        <Card className="row-start-2 row-end-6 col-start-1 col-end-3">
          <CardHeader>
            <CardTitle>{dictionary.seller.main.overviewTitle}</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-[90%]">
            <Overview sales={analytics.recentSales} />
          </CardContent>
        </Card>
        <Card className="row-start-2 row-end-6 col-start-3 col-end-5">
          <RecentSales
            recentSalesTitle={dictionary.seller.main.recentSalesTitle}
            sales={analytics.recentSales}
          />
        </Card>
      </div>
    </main>
  );
}
