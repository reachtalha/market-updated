import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import Product from '@/components/common/Buyer/Products/ProductDetails';

import { notFound } from 'next/navigation';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

type Product = {
  id: string;
  name: string;
  price: number;
  shopId: string;
  type: string;
  SKU: any;
  description: string;
  otherImages: string[];
  coverImage: string;
  shopName?: string;
};

const getProduct = async (id: string) => {
  const docRef = await getDoc(doc(db, 'products', id));
  if (!docRef.exists()) return null;

  let product: Product = { id: docRef.id, ...docRef.data() } as Product;
  return product;
};

type props = { params: { id: string } };
export default async function Page({ params }: props) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <BoxedContent className="py-20">
      <Product productJSON={JSON.stringify(product)} />
      <div className="py-5 md:py-10">
        <OrganicSimplifiedSection />
      </div>
    </BoxedContent>
  );
}
