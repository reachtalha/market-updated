import BoxedContent from '@/components/common/BoxedContent';
import NewRegistrationForm from '@/components/NewRegistrationForm';
import { Separator } from '@/components/ui/separator';

export default function Onboarding() {
  return (
    <BoxedContent className="flex flex-col justify-center items-center h-full gap-x-5 px-14">
      <header className="text-center">
        <h1 className="text-4xl font-medium mb-2 font-alpina">Register yourself</h1>
        <p>Create your All Organics. Account</p>
      </header>
      <Separator className="my-8" />
      <NewRegistrationForm />
    </BoxedContent>
  );
}
