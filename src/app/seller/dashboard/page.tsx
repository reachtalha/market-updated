"use client";

import useSWR from 'swr';
import { db, auth } from '@/lib/firebase/client';
import { getDocs, query, collection, where, limit } from "@firebase/firestore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecentSales } from '@/components/modules/Seller/Dashboard/RecentSales';
import Overview from '@/components/modules/Seller/Dashboard/Overview';

import { formatDate } from '@/utils/formatters';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';


export default function Home() {

  const {
    data: analytics,
    error,
    isLoading,
  } = useSWR("dashboard", async () => {
    let recentSales: any = [];
    let totalSales = 0;
    let totalProducts = 0;
    let totalOrders = 0;
    const productQuery = getDocs(
      query(
        collection(db, "shops"),
        where("uid", "==", `${auth.currentUser?.uid}`),
        limit(1)
      )
    );
    const orderQuery = getDocs(
      query(
        collection(db, "orders"),
        where("sellers", "array-contains", `${auth.currentUser?.uid}`)
      )
    );
    const [productSnap, orderSnap] = await Promise.all([
      productQuery,
      orderQuery,
    ]);
    totalProducts = productSnap.docs[0]?.data()?.noOfProducts;
    orderSnap.forEach((order) => {
      totalOrders++;
      recentSales.push({
        id: order.id,
        name: order.data().name,
        amount: order.data().total,
        time: formatDate(order.data().placedAt.seconds * 1000),
        status: order.data().status,
      });
      order.data().products.map((item: any) => {
        if (item.uid === auth.currentUser?.uid) {
          totalSales += parseInt(item.price);
        }
      });
    });
    return {
      totalSales,
      totalProducts,
      totalOrders,
      recentSales,
    };
  });
  if (isLoading) {
    return <Loader className="h-full w-full grid place-content-center" />;
  }
  if (error) {
    return <Error className="h-full w-full grid place-content-center" />;
  }
  console.log(analytics)

  return (
    <main className="p-3 md:p-5 lg:p-8 space-y-4">
      <h1 className="text-xl font-semibold">Greeting, {auth.currentUser?.displayName}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
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
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Now
            </CardTitle>
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
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
