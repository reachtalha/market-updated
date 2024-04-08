// 'use client';
import BoxedContent from '@/components/common/BoxedContent';
import Title from '@/components/common/Seller/Shared/Title';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
  // stripeAccountId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  amount: number;
};

export default function Payouts() {
  const router = useRouter();

  const PayoutSchema = z.object({
    email: z.string().min(1, { message: 'required' }).email({
      message: 'Must be a valid email'
    }),
    firstName: z.string().min(1, { message: 'required' }),
    lastName: z.string().min(1, { message: 'required' }),
    phone: z.string().min(1, { message: 'required' })
  });

  const form = useForm<PayoutTypes>({
    resolver: zodResolver(PayoutSchema)
  });

  const fetchCreatePayoutAccount = async (data: any) => {
    const res = await axios.post('/api/payouts/create-account', data);
    console.log(res.data);
    if (typeof res.data === 'string') {
      router.push(res.data);
    }
    return;
  };

  const handleCreateAccount = async (data: any) => {
    fetchCreatePayoutAccount({
      // acct_1P3FRLGhzjOMQ8ID working
      // acct_1P3Co22cxlpaluiu

      stripeAccountId: 'acct_1P3FRLGhzjOMQ8ID' || null,
      email: 'dev@allorganics.com',
      firstName: 'Dev',
      lastName: 'Team',
      phone: '+923414419121',
      amount: 1
    });
  };

  // const onSubmit = async (data: any) => {
  //   console.log(data);

  //   fetchCreatePayoutAccount({
  //     stripeAccountId: null,
  //     email: data.email,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     phone: data.phone
  //   });
  // };

  return (
    <BoxedContent className="py-5">
      <Title title="Payouts" />
      <div className="flex w-full justify-center items-center">
        {/* <Card className="md:w-[50%] w-full px-3">
          <CardHeader>
            <CardTitle>Add Payout Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-neutral-500 text-sm 2xl:text-base flex flex-col gap-4"
              >
                <FormField // email
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-base"
                          placeholder="Email Here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField // first Name
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-base"
                          placeholder="First Name here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField // last Name
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-base"
                          placeholder="Last Name here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField // phone
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full bg-neutral-100 placeholder:text-sm text-xs lg:text-base"
                          placeholder="Phone Number here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  // onClick={handleCreateAccount}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Payout
                </button>
              </form>
            </Form>
          </CardContent>
        </Card> */}
        <button
          onClick={handleCreateAccount}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Payout
        </button>
      </div>
    </BoxedContent>
  );
}
