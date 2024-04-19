import { LocaleType } from '@/app/[lang]/(buyer)/page';
import OrderDetailsPage from '@/components/common/Buyer/OrderDetailsPage';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

export default async function Page({
  params: { lang, id }
}: {
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <OrderDetailsPage dictionary={dictionary.account.orderHistory.orderDetails} orderId={id} />
  );
}
