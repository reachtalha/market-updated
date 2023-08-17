import { Button } from '@/components/ui/button';

import SortByRating from '@/components/common/Buyer/Products/ProductDetails/SortByRating';
import LeaveReviewModal from '@/components/common/Buyer/Products/ProductDetails/LeaveReviewModal';

import { auth, db } from '@/lib/firebase/client';
import { collection, getDoc, query, where, getDocs, doc } from 'firebase/firestore';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import ReactStars from 'react-stars';

const canReview = async (productId: string) => {
  const userId = auth.currentUser?.uid;

  const orderRef = await getDocs(query(collection(db, 'orders'), where('userId', '==', userId)));
  let count = 0;
  let _canReview = {
    state: false,
    orderId: ''
  };

  orderRef.forEach((doc) => {
    doc.data().items.forEach((item: any) => {
      if (item.productId === productId && !item?.reviewed) {
        _canReview = {
          state: true,
          orderId: doc.id
        };
        count++;
      }
    });
  });
  console.log(count);
  return _canReview;
};

const getReviews = async (productId: string) => {
  const reviewDocs = await getDocs(
    query(collection(db, 'reviews'), where('productId', '==', productId))
  );

  const reviewPromises = reviewDocs.docs.map(async (document) => {
    if (document.exists()) {
      const userRef = doc(db, 'users', document.data().userId);
      const userDoc = await getDoc(userRef);

      return {
        id: document.id,
        reviewer: userDoc.exists() ? userDoc.data().name : 'Unknown User',
        review: document.data().description,
        rating: document.data().rating
      };
    }
    return null;
  });

  const reviews = await Promise.all(reviewPromises);

  return reviews;
};

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: _canReview, error: canReviewError } = useSwr('review-eligible', () =>
    canReview(productId)
  );
  const {
    data: reviews,
    error,
    isLoading
  } = useSwr('product-reviews', () => getReviews(productId));

  if (isLoading) return <Loader className="flex w-full h-52 justify-center items-center" />;
  if (error || canReviewError) return <Error />;

  const averageRating =
    reviews &&
    reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews?.length;
  return (
    <div className="bg-neutral-100 rounded-lg p-6 md:p-9">
      <header className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center md:items-start md:justify-center w-full md:w-fit">
          <h6 className="flex gap-2 items-center mb-1">
            <span className="font-medium">{averageRating}</span>
            <ReactStars value={averageRating} edit={false} color2="#000000" />
          </h6>
          <p className="text-sm">AVERAGE RATING</p>
          <Button variant="outline" className="w-full mt-6 border-neutral-900 text-neutral-900">
            Filters
          </Button>
        </div>

        {_canReview?.state && (
          <LeaveReviewModal
            trigger={
              <Button
                variant="outline"
                className="w-full mt-3 md:mt-0 flex items-end border-neutral-900 px-14 text-neutral-900"
              >
                Write a review
              </Button>
            }
            productId={productId}
            orderId={_canReview?.orderId}
          />
        )}
      </header>

      <div className="mt-10 flex items-center justify-between pb-3 border-b border-neutral-900/15">
        <p>{reviews?.length} reviews</p>
        <SortByRating />
      </div>
      <ul className="">
        {reviews?.map((review: any) => (
          <li
            className="grid gap-y-4 md:grid-cols-3 py-5 border-b border-neutral-900/15"
            key={review.id}
          >
            <div className="col-span-1">
              <p className="font-medium">{review.reviewer}</p>
              <span>Verified Buyer</span>
            </div>
            <div className="col-span-2">
              <ReactStars value={review.rating} edit={false} color2="#000000" />
              <p className="mt-1 md:mt-3">{review.review}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-10">
        <Button variant="outline" className="border-neutral-900 px-14 text-neutral-900">
          show more
        </Button>
      </div>
    </div>
  );
}
