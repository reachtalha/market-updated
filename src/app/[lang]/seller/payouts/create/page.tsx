'use client';

import { useState } from 'react';
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
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';

type PayoutTypes = {
  amount: number;
};

const PayoutSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid currency format' })
    .min(1, { message: 'Amount is required' })
    .max(8, { message: 'Exceeded maximum payout amount' })
    .refine((value) => parseFloat(value) >= 0, { message: 'Amount must be non-negative' })
});
const CreatePayout = () => {
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const {
    data: balance,
    isLoading,
    error
  } = useSWR(user?.stripeConnectId ? 'balance' : null, async () => {
    const res = await axios.post('/api/payouts/get-balance', {
      stripeConnectId: user?.stripeConnectId
    });
    return res.data;
  });

  console.log(error);

  const form = useForm<PayoutTypes>({
    resolver: zodResolver(PayoutSchema)
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/payouts/manual-payouts', {
        stripeConnectId: user?.stripeConnectId,
        amount: data.amount
      });

      if (res.status !== 200) {
        throw Error();
      }
      if (res.data && res.data.message && res.data.message.code === 'balance_insufficient') {
        toast.error('Error creating payout. You have Insufficient Balance for this payout request');
      } else {
        toast.success('Payout created successfully!');
        form.reset();
      }
    } catch (error: any) {
      toast.error('Error creating payout. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[500px] h-fit mx-auto">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <h1>Current Balance:</h1>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500 text-xs">Error: Failed to fetch balance</p>
            ) : (
              <p className="text-green-500">{`$${balance}`}</p>
            )}{' '}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-neutral-500 text-sm 2xl:text-base flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add amount for the Payout (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-lg"
                      placeholder="Amount in USD Here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              disabled={loading || !user?.stripeConnectId}
            >
              {loading ? 'Processing Payout' : 'Create Payout'}{' '}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePayout;
