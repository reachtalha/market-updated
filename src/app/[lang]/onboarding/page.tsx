import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from '@firebase/firestore';

import OnBoardingForm from '@/components/modules/OnBoarding';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { Locale } from '@/i18n-config';

async function getOnboardingInfo(id: string) {
  const docRef = await getDoc(doc(db, 'users', `${id}`));
  if (docRef.exists()) return docRef.data().role;
  return null;
}

const OnBoarding = async ({
  searchParams,
  params: { lang }
}: {
  searchParams?: { [key: string]: string | undefined };
  params: { lang: Locale };
}) => {
  const { id } = searchParams!;
  if (!id) {
    redirect(`/${lang}`);
  }
  const isOnboarded = await getOnboardingInfo(id);
  if (isOnboarded === 'seller') {
    redirect(`/${lang}/seller/dashboard`);
  } else if (isOnboarded) {
    redirect(`/${lang}`);
  }

  return (
    <>
      <section className="relative space-y-3 lg:w-[500px] max-w-[550px] rounded-xl border-0 md:border-2 md:p-5 px-3 py-4">
        <OnBoardingForm />
      </section>
    </>
  );
};

export default OnBoarding;
