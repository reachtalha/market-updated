import { Button } from '@/components/ui/button';

import SortByRating from '@/components/common/Buyer/Products/ProductDetails/SortByRating';

import { db } from '@/lib/firebase/client';
import { collection, getDoc, query, where, getDocs, doc } from 'firebase/firestore';
import useSwr from 'swr';
import Error from '@/components/common/Error';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';

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
        reviewer: userDoc.exists() ? userDoc.data().name : 'Anonymous',
        review: document.data().description,
        rating: document.data().rating
      };
    }
    return null;
  });

  const reviews = await Promise.all(reviewPromises);

  return reviews;
};

export default function ProductReviews({
  productId,
  averageReviews,
  setAverageReviews,
  dictionary
}: {
  productId: string;
  averageReviews: number;
  setAverageReviews: (value: number) => void;
  dictionary: any
}) {
  const [sort, setSort] = useState('highest');
  const [showReviews, setShowReviews] = useState(4);

  const {
    data: reviews,
    error,
    isLoading
  } = useSwr('product-reviews', () => getReviews(productId));

  useEffect(() => {
    const averageRating =
      reviews &&
      reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews?.length;
    setAverageReviews(averageRating || -1);
  }, [reviews]);

  if (isLoading) {
    return <div className="bg-neutral-100 rounded-lg px-3 py-6 md:py-12 animate-pulse mb-5"></div>;
  }
  if (error) return <Error className="grid w-full h-52 place-content-center" />;

  if (reviews?.length === 0) {
    return (
      <div className="bg-neutral-100 rounded-lg px-3 py-6 md:py-12 mb-5">
        <p className="text-center text-lg 2xl:text-xl font-semibold">{dictionary.productDetails.reviews.noReviewsLabel}</p>
        <p className="text-center text-sm 2xl:text-base">
          {dictionary.productDetails.reviews.leaveReviewLabel}
        </p>
      </div>
    );
  }
  return (
    <div className="bg-neutral-100 rounded-lg p-6 md:p-9 mb-5">
      <header className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center md:items-start md:justify-center w-full md:w-fit">
          <h6 className="flex gap-2 items-center mb-1">
            {averageReviews < 0 ? (
              <span className="font-medium">{dictionary.productDetails.reviews.noReviewsLabel}</span>
            ) : (
              <>
                <span className="font-medium">{averageReviews.toFixed(2)}</span>
                <ReactStars value={averageReviews} edit={false} color2="#000000" />
              </>
            )}
          </h6>
          <p className="text-sm">{dictionary.productDetails.reviews.averageRatingLabel}</p>
        </div>
      </header>

      <div className="mt-10 flex items-center justify-between pb-3 border-b border-neutral-900/15">
        <p>{reviews?.length} reviews</p>
        <SortByRating sort={sort} setSort={setSort} />
      </div>
      <ul className="">
        {reviews
          ?.slice(0, showReviews)
          .sort((a: any, b: any) => {
            if (sort === 'highest') return b.rating - a.rating;
            else return a.rating - b.rating;
          })
          .map((review: any) => (
            <li
              className="grid gap-y-4 md:grid-cols-3 py-5 last:border-0 border-b border-neutral-900/15"
              key={review.id}
            >
              <div className="col-span-1">
                <p className="font-medium capitalize">{review.reviewer}</p>
                <span>Verified Buyer</span>
              </div>
              <div className="col-span-2">
                <ReactStars value={review.rating} edit={false} color2="#000000" />
                <p className="mt-1 md:mt-3">{review.review}</p>
              </div>
            </li>
          ))}
      </ul>
      {reviews && reviews?.length > showReviews && (
        <div className="flex justify-end mt-10">
          <Button
            onClick={() => setShowReviews(reviews.length)}
            variant="outline"
            className="border-neutral-900 px-14 text-neutral-900"
          >
            {dictionary.productDetails.reviews.showMoreBtnLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
