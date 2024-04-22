import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ListPayouts = () => {
  const { user } = useCurrentUser();
  const [payouts, setPayouts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/payouts/list-all-payouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ stripeConnectId: user?.stripeConnectId })
        });
        if (response.ok) {
          const data = await response.json();
          setPayouts(data.data); // Extracting the 'data' array from the response
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.stripeConnectId]);

  return (
    <div>
      <h1>List of Payouts</h1>
      <ul>
        {payouts.map((payout: any) => (
          <li key={payout.id}>
            <p>ID: {payout.id}</p>
            <p>Amount: {'$' + Number(payout.amount) / 100}</p>
            <p>Currency: {payout.currency}</p>
            {/* Add other payout details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPayouts;
