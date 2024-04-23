'use client';

import useSWR from 'swr';
import axios from 'axios';
import { columns } from './columns';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Error from '@/components/common/Error';
import { DataTable } from './data-table';
import Loader from '@/components/common/Loader';

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
      <div className="w-screen bg-white h-screen overflow-hidden grid place-content-center">
        <Loader />
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
    <div className="w-full h-fit space-y-3 border rounded-lg">
      <h1 className="p-5 text-xl font-semibold text-primary">Your Payouts</h1>
      <div className="">{payouts && <DataTable data={payouts} columns={columns} />}</div>
    </div>
  );
};

export default ListPayouts;
