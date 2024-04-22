'use client';

import axios from 'axios';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type PayoutTypes = {
  amount: number;
};

const CreatePayout = () => {
  const { user } = useCurrentUser();
  console.log(user);
  const PayoutSchema = z.object({
    amount: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid currency format' })
      .min(1, { message: 'Amount is required' })
      .refine((value) => parseFloat(value) >= 0, { message: 'Amount must be non-negative' })
  });

  const form = useForm<PayoutTypes>({
    resolver: zodResolver(PayoutSchema)
  });

  const fetchCreatePayoutAccount = async (data: any) => {
    if (data.stripeConnectId) {
      console.log(data);
      const res = await axios.post('/api/payouts/manual-payouts', data);
      return;
    }
    console.error('Stripe account not found');
  };

  const onSubmit = async (data: any) => {
    fetchCreatePayoutAccount({
      stripeConnectId: user?.stripeConnectId,
      amount: data.amount
    });
  };
  return (
    <div className="flex w-full justify-center items-center">
      <Card className="md:w-[50%] w-full px-3">
        <CardHeader>
          <CardTitle>Add Amount for the Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="text-neutral-500 text-sm 2xl:text-base flex flex-col gap-4"
            >
              <FormField // amount
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payout Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-base"
                        placeholder="Amount in USD Here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Payout
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* <button
    onClick={handleCreatePayout}
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Create Payout
  </button> */}
    </div>
  );
};

export default CreatePayout;
