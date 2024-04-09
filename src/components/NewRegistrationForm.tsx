'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n-config';

interface NewRegistrationFormProps {
  params: { lang: Locale };
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  email: z.string().min(1, { message: 'required' }).email({
    message: 'Must be a valid email'
  }),
  role: z.union([z.literal('seller'), z.literal('influencer')])
});

export default function NewRegistrationForm({ params }: NewRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'seller'
    }
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      //get user with email
      let userRef = await getDocs(
        query(collection(db, 'users'), where('email', '==', values.email))
      );
      if (userRef.docs.length > 0) {
        toast.error('User with this email already registered');
        return;
      }

      userRef = await getDocs(
        query(collection(db, 'waiting-list'), where('email', '==', values.email))
      );

      if (userRef.docs.length > 0) {
        toast.error('User with this email already in waiting list');
        return;
      }
      console.log(values);

      await addDoc(collection(db, 'waiting-list'), {
        name: values.name,
        email: values.email,
        role: values.role
      });

      toast.success('You have been added to the waiting list');
      reset();
      // router.push(`/${params.lang}/auth/login`);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <div className="flex gap-x-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="seller" />
                    </FormControl>
                    <FormLabel className="font-normal">Seller</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="influencer" />
                    </FormControl>
                    <FormLabel className="font-normal">Expert</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Registering' : 'Register'}{' '}
        </Button>
      </form>
    </Form>
  );
}
