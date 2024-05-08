import BoxedContent from '@/components/common/BoxedContent';
import NewRegistrationForm from '@/components/NewRegistrationForm';
import { Separator } from '@/components/ui/separator';
import { Locale } from '@/i18n-config';
import { auth } from '@/lib/firebase/client';

interface OnboardingProps {
  params: { lang: Locale };
}

export default function Onboarding({ params }: OnboardingProps) {
  return (
    <BoxedContent className="flex flex-col justify-center items-center h-full gap-x-5 px-14">
      <header className="text-center">
        <h1 className="text-4xl font-medium mb-2 font-alpina">Register yourself</h1>
        <p>Create your All Organics. Account</p>
      </header>
      <Separator className="my-8" />
      <NewRegistrationForm params={params} />
    </BoxedContent>
  );
}
