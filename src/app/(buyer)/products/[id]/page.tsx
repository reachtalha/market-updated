import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import Product from '@/components/common/Buyer/Products/ProductDetails';
import Error from '@/components/common/Error';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const getProduct = async (id: string) => {
  const docRef = await getDoc(doc(db, 'products', id));
  if (!docRef.exists()) return null;
  return { id: docRef.id, ...docRef.data() };
};

type props = { params: { id: string } };
export default async function Page({ params }: props) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return <Error />;

  return (
    <BoxedContent className="py-20">
      <Product product={{ ...product }} />
      <div className="py-5 md:py-10">
        <OrganicSimplifiedSection />
      </div>
    </BoxedContent>
  );
}
