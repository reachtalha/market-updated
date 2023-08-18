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
import ReactStars from 'react-stars';

import { db, auth } from '@/lib/firebase/client';
import { collection, addDoc, updateDoc, query, where, doc, getDoc } from 'firebase/firestore';
import { mutate } from 'swr';

type LeaveReviewModalProps = {
  trigger: ReactNode;
  productId: string;
  orderId: string;
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
};

const updateOrder = async (orderId: string, productId: string) => {
  const orderRef = await getDoc(doc(db, 'orders', orderId));
  if (orderRef.exists()) {
    let items: any = [];
    orderRef.data().items.forEach((item: any) => {
      if (item.productId === productId) {
        item.reviewed = true;
      }
      items.push(item);
    });

    await updateDoc(doc(db, 'orders', orderId), {
      items: items
    });
  }
};

export default function LeaveReviewModal({ trigger, productId, orderId }: LeaveReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (description.trim().length < 4) {
      toast.error('Description must be at least 4 characters long.');
      return;
    }
    try {
      await addReview(rating, description, productId, orderId);
      await updateOrder(orderId, productId);
      mutate('review-eligible');
      mutate('product-reviews');
      setOpen(false);
      toast.success('Review added successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <ReactStars
            count={5}
            onChange={(rating) => setRating(rating)}
            size={24}
            value={rating}
            color1="#E0E0E0"
            color2={'#000000'}
          />
          <DialogDescription>
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
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
