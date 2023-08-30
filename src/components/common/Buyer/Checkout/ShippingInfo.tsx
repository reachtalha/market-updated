'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function ShippingInfo({ form }: { form: any }) {
  return (
    <section>
      <h2 className="mb-6 text-xl font-medium">Contact</h2>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
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
                <Input className="capitalize" placeholder="First name" {...field} />
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
                <Input className="capitalize" placeholder="Last name" {...field} />
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
              <Input className="capitalize" placeholder="Company" {...field} />
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
              <Input className="capitalize" placeholder="Address" {...field} />
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
              <Input className="capitalize" placeholder="Apartment, suite, etc." {...field} />
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
              <Input className="capitalize" placeholder="City" {...field} />
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
                <Input className="capitalize" placeholder="State / Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="lastName"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem className="w-full">*/}
        {/*      <FormLabel>Postal code</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder="Postal code"  {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
      </div>

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="mt-5 w-full">
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input className="capitalize" placeholder="phone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-8" />
    </section>
  );
}
