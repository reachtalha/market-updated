import Stars from '@/assets/icons/system/Stars';
import { Button } from '@/components/ui/button';
import SortByRating from '@/components/common/Buyer/Products/ProductDetails/SortByRating';
import LeaveReviewModal from '@/components/common/Buyer/Products/ProductDetails/LeaveReviewModal';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    reviewer: 'Stevee P.',
    review: 'Love this body wash! It smells great and pairs nicely with my deodorant. My only complaint \n' +
      'is the price.',
    rating: 3
  },
  {
    id: 2,
    reviewer: 'Sarah U.',
    review: 'Absolutely love the body wash.',
    rating: 5
  },
  {
    id: 3,
    reviewer: 'Zoe C.',
    review: 'Really lovely body wash from what I usually use.',
    rating: 4
  },
  {
    id: 4,
    reviewer: 'Shelly B.',
    review: `I love the smell and the way it leaves my skin feeling definitely getting other fragrances. Going to try the all.`,
    rating: 5
  },
]

export default function ProductReviews(){
  const [isLeaveReviewModalOpen, setIsLeaveReviewModalOpen] = useState(false);

  return <div className="bg-neutral-100 rounded-lg p-9">
    <header className="flex justify-between">
      <div>
        <h6 className="flex gap-2 items-center mb-1">
          <span className="font-medium">4.9</span>
          <Stars />
        </h6>
        <p className="text-sm">AVERAGE RATING</p>
        <Button variant="outline" className="mt-6 border-neutral-900 text-neutral-900">Filters</Button>
      </div>

      <LeaveReviewModal
        trigger={(
          <Button variant="outline" className="flex items-end border-neutral-900 px-14 text-neutral-900">Write a review</Button>
        )}
      />
    </header>

    <div className="mt-10 flex items-center justify-between pb-3 border-b border-neutral-900/15">
      <p>{reviews.length} reviews</p>
      <SortByRating />
    </div>
    <ul className="">
      {reviews.map(review => (
        <li className="grid grid-cols-3 py-5 border-b border-neutral-900/15" key={review.id}>
          <div className="col-span-1">
            <p className="font-medium">{review.reviewer}</p>
            <span>Verified Buyer</span>
          </div>
          <div className="col-span-2">
            <Stars />
            <p className="mt-3">{review.review}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className="flex justify-end mt-10">
      <Button variant="outline" className="border-neutral-900 px-14 text-neutral-900">show more</Button>
    </div>
  </div>
}