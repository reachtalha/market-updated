import { auth, db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import useSwr from 'swr';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import ProductCard from '@/components/common/Buyer/Cards/ProductCard';
import LatestProducts from '@/components/common/Buyer/LatestProducts';

const getWishlistProduct = async () => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    return []; // No user ID, return an empty array
  }

  const productsRef = await getDoc(doc(db, 'wishlist', userId));

  if (!productsRef.exists()) {
    return []; // Wishlist doesn't exist, return an empty array
  }

  const productIds = productsRef.data().productIds || [];

  const productPromises = productIds.map(async (productId: string) => {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      return { id: productId, ...productSnapshot.data() };
    } else {
      return null; // Handle the case where a product doesn't exist
    }
  });

  const products = await Promise.all(productPromises);

  // Filter out any null values (non-existent products)
  return products.filter((product) => product !== null);
};

const Wishlist = () => {
  const { data: products, isLoading, error } = useSwr('wishlist', getWishlistProduct);
  if (isLoading) return <Loader className="grid place-content-center h-[50vh] w-full" />;
  if (error) return <Error className="grid place-content-center h-[50vh] w-full" />;

  return (
    <div className="w-full">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 mt-4 md:mt-0  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {products.map((_: any, i: number) => (
            <ProductCard
              key={i + Math.random()}
              id={_.id}
              image={_.coverImage}
              name={_.name}
              price={
                _.SKU?.length === 1
                  ? _.SKU[0].price
                  : _.SKU.sort((a: any, b: any) => a.price - b.price)[0].price
              }
              shop={_.shopName || 'some shop'}
              type={_.type}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-4 md:mt-0 gap-5">
          <div className="text-center  flex items-center justify-center   w-[80vw] md:!w-[80vw] h-[20vh] text-gray-500">
            No products found
          </div>
          <LatestProducts />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
