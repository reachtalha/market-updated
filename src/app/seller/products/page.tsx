import { Product, columns } from "./columns";
import { DataTable } from "./data-table";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Title from "@/components/common/Seller/Shared/Title";

async function getData(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products: Product[] = [];

  querySnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      status: doc.data().status,
    });
  });

  return products;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className='container mx-auto py-20'>
      <Title title='Products' />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
