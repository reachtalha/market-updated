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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

import { addDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const formSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  email: z.string().min(1, { message: 'required' }).email({
    message: 'Must be a valid email'
  }),
  bio: z.string().min(1, { message: 'required' }),
  twitter: z.string().url({ message: 'Must be a valid url' }).optional().or(z.literal('')),
  facebook: z.string().url({ message: 'Must be a valid url' }).optional().or(z.literal('')),
  instagram: z.string().url({ message: 'Must be a valid url' }).optional().or(z.literal('')),
  linkedin: z.string().url({ message: 'Must be a valid url' }).optional().or(z.literal('')),
  website: z.string().url({ message: 'Must be a valid url' }).optional().or(z.literal(''))
});

export default function NewRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      website: ''
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

      await addDoc(collection(db, 'waiting-list'), {
        name: values.name,
        email: values.email,
        bio: values.bio,
        socials: [
          {
            name: 'twitter',
            url: values.twitter
          },
          {
            name: 'facebook',
            url: values.facebook
          },
          {
            name: 'instagram',
            url: values.instagram
          },
          {
            name: 'linkedin',
            url: values.linkedin
          },
          {
            name: 'website',
            url: values.website
          }
        ]
      });

      toast.success('You have been added to the waiting list');
      reset();
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl className="mt-5">
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-3">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Twitter</FormLabel>
                <FormControl className="mt-5">
                  <Input placeholder="Twitter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Facebook</FormLabel>
                <FormControl className="mt-5">
                  <Input placeholder="Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-x-3">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Instagram</FormLabel>
                <FormControl className="mt-5">
                  <Input placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LinkedIn</FormLabel>
                <FormControl className="mt-5">
                  <Input placeholder="LinkedIn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl className="mt-5">
                <Input placeholder="Website" {...field} />
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
