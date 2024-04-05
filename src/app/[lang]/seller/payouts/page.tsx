'use client';
import { useState } from 'react';
import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const fetchCreatePayoutAccount = (data: any) => {
  return axios.post('/api/payouts/create-account', data);
};

export default function Payouts() {
  const handleCreateAccount = async () => {
   fetchCreatePayoutAccount({
      stripeAccountId: null,
      email: 'dev@allorganics.com',
      firstName: 'Dev',
      lastName: 'Team',
      phone: '+923414419121'
    });
  };

  return (
    <BoxedContent className="py-20">
      <Title title="Payouts" />
      <button onClick={handleCreateAccount}>create payout</button>
    </BoxedContent>
  );
}
