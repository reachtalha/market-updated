'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';

export default function SellerPaymentInfo({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLinkAccount = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/payouts/create-account', {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        firstName: auth.currentUser?.displayName?.toLowerCase().split(' ')[0],
        lastName: auth.currentUser?.displayName?.toLowerCase()?.split(' ')[1] || 'Seller'
      });
      if (typeof res.data === 'string') {
        router.push(res.data);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong while creating your payout account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 space-y-5">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <Button type="button" className="w-full" disabled={loading} onClick={handleLinkAccount}>
        {loading ? 'Connecting...' : ' Connect with Stripe'}
      </Button>
    </div>
  );
}
