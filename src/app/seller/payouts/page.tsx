"use client"
import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import axios from 'axios';
import useSwr from 'swr';

const fetchCreatePayoutAccount = (data: any) => {
  return axios.post('/api/payouts/create-account', data);
};

export default function Payouts(){

  const handleCreateAccount = async () => {
    const data = await fetchCreatePayoutAccount({
      stripeAccountId: null,
      email: "dawoodshahat@gmail.com",
      firstName: "Dawood",
      lastName: "Shahat",
      phone: "+923414419121"
    })

    console.log(data);
  }

  return (
    <BoxedContent className="py-20">
      <Title title="Payouts" />
      <button onClick={handleCreateAccount} >create payout</button>
    </BoxedContent>
  )
}