"use client"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator';

export default function ShippingInfo(){
  const formSchema = z.object({
    email: z.string().min(1, { message: "required" }).email({
      message: "Must be a valid email",
    }),
    firstName: z.string().min(1, { message: "required" }),
    lastName: z.string().min(1, { message: "required" }),
    company: z.string().min(1, { message: "required" }),
    address: z.string().min(1, { message: "required" }),
    apartments: z.string().min(1, { message: "required" }),
    city: z.string().min(1, { message: "required" }),
    state: z.string().min(1, { message: "required" }),
    postal: z.string().min(1, { message: "required" }),
    phone: z.string().min(1, { message: "required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      apartments: "",
      city: "",
      state: "",
      postal: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('here', values)
  }

  return (
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="mb-6 text-xl font-medium">Contact</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-8" />
            <h2 className="mb-6 text-xl font-medium">Shipping Address</h2>

            <div className="flex gap-x-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartments"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
                  <FormLabel>Apartment, suite, etc.</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc."  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-5 flex gap-x-3">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input placeholder="State / Province"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Postal code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal code"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-5 w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="phone"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-8" />

            {/*<Button type="submit">Submit</Button>*/}
          </form>
        </Form>
      </section>
  )
}