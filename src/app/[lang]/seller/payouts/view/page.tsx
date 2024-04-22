'use client';

import useSWR from 'swr';
import axios from 'axios';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import Error from '@/components/common/Error';

const ListPayouts = () => {
  const { user } = useCurrentUser();
  const {
    data: payouts,
    isLoading,
    error
  } = useSWR(user?.stripeConnectId ? 'user-payout' : null, async () => {
    const res = await axios.post('/api/payouts/list-all-payouts', {
      stripeConnectId: user?.stripeConnectId
    });
    return res.data?.data;
  });

  if (isLoading) {
    return (
      <div>
        Loading
        {
          //show skeleton loder here
        }
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-content-center">
        <Error />
      </div>
    );
  }

  return (
    <div>
      <h1>List of Payouts</h1>
      <ul>
        {payouts?.map((payout: any) => (
          <li key={payout.id}>
            <p>ID: {payout.id}</p>
            <p>Amount: {'$' + Number(payout.amount) / 100}</p>
            <p>Currency: {payout.currency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPayouts;
