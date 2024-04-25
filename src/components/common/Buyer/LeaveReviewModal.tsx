import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import ReactStar from 'react-stars';
import Image from '@/components/common/FallbackImage';

import { db, auth } from '@/lib/firebase/client';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  where,
  query
} from 'firebase/firestore';
import { mutate } from 'swr';
import { ArrowLeft } from 'lucide-react';
const ReactStars = ReactStar as any;

type LeaveReviewModalProps = {
  trigger: ReactNode;
  order: any;
};

const addReview = async (
  rating: number,
  description: string,
  productId: string,
  orderId: string
) => {
  await addDoc(collection(db, 'reviews'), {
    rating,
    description,
    productId,
    orderId,
    timeStamp: new Date(),
    userId: auth.currentUser?.uid
  });
  const reviewDocs = await getDocs(
    query(collection(db, 'reviews'), where('productId', '==', productId))
  );

  const reviews = reviewDocs.docs.map((doc) => doc.data());
  if (reviews.length > 0) {
    rating =
      reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews?.length;
  }
  await updateDoc(doc(db, 'products', productId), { rating });
};

const updateOrder = async (orderId: string, productId: string) => {
  const orderRef = await getDoc(doc(db, 'orders', orderId));
  if (orderRef.exists()) {
    let items: any = [];
    orderRef.data().items.forEach((item: any) => {
      if (item.id === productId) {
        item.reviewed = true;
      }
      items.push(item);
    });

    await updateDoc(doc(db, 'orders', orderId), {
      items: items
    });
  }
};

export default function LeaveReviewModal({ trigger, order }: LeaveReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState('');

  if (order?.status !== 'complete') return null;

  const handleClick = (id: string) => {
    setReviewingProduct(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-[90%] md:w-full ">
        <DialogHeader>
          <DialogTitle>
            {reviewingProduct === '' ? (
              'Order Items'
            ) : (
              <div className="flex flex-col items-start gap-y-3">
                <ArrowLeft className="cursor-pointer" onClick={() => setReviewingProduct('')} />
                <span> Leave a Review</span>
              </div>
            )}
          </DialogTitle>

          <DialogDescription>
            {reviewingProduct === '' ? (
              <ul className="space-y-1 mt-1">
                {order?.products.map((product: any) => (
                  <li key={product.id} className="flex  capitalize gap-x-2 items-center">
                    <Image
                      src={product.image}
                      height={200}
                      width={200}
                      className="object-cover w-24 h-24 rounded-sm"
                      alt=""
                    />

                    <span className="w-2/4 text-normal">{product.name}</span>
                    <Button
                      onClick={() => handleClick(product.id)}
                      disabled={product.reviewed}
                      className="ms-auto bg-primary"
                    >
                      {product.reviewed ? 'Reviewed' : 'Add Review'}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <AddReview
                orderId={order.id}
                productId={reviewingProduct}
                setReviewingProduct={setReviewingProduct}
              />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const AddReview = ({
  orderId,
  productId,
  setReviewingProduct
}: {
  orderId: string;
  productId: string;
  setReviewingProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (description.trim().length < 4) {
      toast.error('Description must be at least 4 characters long.');
      return;
    }
    try {
      setLoading(true);
      await addReview(rating, description, productId, orderId);
      await updateOrder(orderId, productId);

      mutate('product-reviews');
      mutate('orders');
      toast.success('Review added successfully!');
      setReviewingProduct('');
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <>
        <ReactStars
          count={5}
          onChange={(rating: any) => setRating(rating)}
          size={24}
          value={rating}
          color1="#E0E0E0"
          color2={'#000000'}
        />
      </>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write here..."
          />
        </div>
        <div className="flex justify-end mt-8">
          <Button disabled={loading} type="submit">
            {loading ? 'Adding Review...' : 'Add Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};
