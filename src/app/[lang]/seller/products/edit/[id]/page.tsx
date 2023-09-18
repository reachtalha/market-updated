import EditProduct from '@/components/modules/AddProduct';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

type Props = {
  params: {
    id: string;
    lang: Locale
  };
};

const getProduct = async (id: string) => {
  const productRef = await getDoc(doc(db, 'products', id));

  return { id: productRef.id, ...productRef.data() };
};

const Page = async (props: Props) => {
  const product: any = await getProduct(props.params.id);
  const dictionary = await getDictionary(props.params.lang);
  return (
    <EditProduct
      dictionary={dictionary}
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
        gender: product.gender
      }}
      isEdit={true}
    />
  );
};

export default Page;
