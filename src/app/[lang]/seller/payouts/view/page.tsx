'use client';

import useSWR from 'swr';
import axios from 'axios';
import { columns } from './columns';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Error from '@/components/common/Error';
import { DataTable } from './data-table';
import Title from '@/components/common/Seller/Shared/Title';

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

  if (error) {
    return (
      <div className="grid place-content-center">
        <Error />
      </div>
    );
  }

  return (
    <div className="w-full h-fit space-y-3 border rounded-lg">
      <div className="p-5 space-y-1.5">
        <Title title="Payouts" />
        <p>
          Your last <b>10</b> transactions
        </p>
      </div>
      {isLoading && <TableSkeletonLoader />}
      {payouts && !isLoading && <DataTable data={payouts} columns={columns} />}
    </div>
  );
};

export default ListPayouts;

const TableSkeletonLoader = () => {
  return (
    <div className="space-y-6 p-5">
      <div className="grid grid-cols-12 animate-pulse gap-5 border-b pb-2.5">
        <div className="col-span-4">
          <div className="w-24 h-7 bg-gray-300 rounded-md" />
        </div>
        <div className="col-span-2">
          <div className="w-16 h-7 rounded-md bg-gray-300" />
        </div>
        <div className="col-span-2">
          <div className="w-16 h-7 rounded-md bg-gray-300" />
        </div>
        <div className="col-span-2">
          <div className="w-16 h-7 rounded-md bg-gray-300" />
        </div>
        <div className="col-span-2">
          <div className="w-24 h-7 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
          <div key={idx} className="grid grid-cols-12 animate-pulse gap-5">
            <div className="col-span-4">
              <div className="w-40 h-5 bg-gray-300 rounded-md" />
            </div>
            <div className="col-span-2">
              <div className="w-16 h-5 rounded-md bg-gray-300" />
            </div>
            <div className="col-span-2">
              <div className="w-16 h-5 rounded-md bg-gray-300" />
            </div>
            <div className="col-span-2">
              <div className="w-16 h-5 rounded-md bg-gray-300" />
            </div>
            <div className="col-span-2">
              <div className="w-24 h-5 rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
