'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function ShippingInfo({ form, dictionary }: { form: any; dictionary: any }) {
  const { user, isLoading } = useCurrentUser();

  return (
    <section>
      <h2 className="mb-6 text-xl font-medium">{dictionary.contact.heading}</h2>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{dictionary.contact.email.label}</FormLabel>
            <FormControl>
              <Input placeholder={dictionary.contact.email.placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator className="my-8" />
      <h2 className="mb-6 text-xl font-medium">{dictionary.shipping.heading}</h2>

      <div className="flex gap-x-3">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{dictionary.shipping.firstName.label}</FormLabel>
              <FormControl>
                <Input
                  className=""
                  placeholder={dictionary.shipping.firstName.placeholder}
                  {...field}
                />
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
              <FormLabel>{dictionary.shipping.lastName.label}</FormLabel>
              <FormControl>
                <Input
                  className=""
                  placeholder={dictionary.shipping.lastName.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="mt-5 w-full">
            <FormLabel>{dictionary.shipping.address.label}</FormLabel>
            <FormControl>
              <Input
                className=""
                placeholder={dictionary.shipping.address.placeholder}
                {...field}
              />
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
            <FormLabel>{dictionary.shipping.city.label}</FormLabel>
            <FormControl>
              <Input className="" placeholder={dictionary.shipping.city.placeholder} {...field} />
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
              <FormLabel>{dictionary.shipping.stateOrProvince.label}</FormLabel>
              <FormControl>
                <Input
                  className=""
                  placeholder={dictionary.shipping.stateOrProvince.placeholder}
                  {...field}
                />
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
            <FormLabel>{dictionary.shipping.phone.label}</FormLabel>
            <FormControl>
              <Input className="" placeholder={dictionary.shipping.phone.placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator className="my-8" />
    </section>
  );
}
