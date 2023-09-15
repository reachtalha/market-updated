import EditProduct from '@/components/modules/AddProduct';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string) => {
  const productRef = await getDoc(doc(db, 'products', id));

  return { id: productRef.id, ...productRef.data() };
};

const Page = async (props: Props) => {
  const product: any = await getProduct(props.params.id);
  return (
    <EditProduct
      defaultValues={{
        id: product.id,
        name: product.name,
        description: product.description,
        detailedDescription: product.detailedDescription,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        type: product.type,
        SKU: product.SKU,
        coverImage: product.coverImage,
        moreImages: product.moreImages,
        gender: product.gender,
        rating: product.rating,
  
      }}
      isEdit={true}
    />
  );
};

export default Page;
