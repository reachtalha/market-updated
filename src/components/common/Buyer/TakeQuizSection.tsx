import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';

type TakeQuizSection = {
  className?: string;
  buttonClassName?: string;
};
export default function TakeQuizSection({ className = '', buttonClassName = '' }: TakeQuizSection) {
  return (
    <div
      className={twMerge(
        `bg-primary text-white text-center py-14 sm:py-20 md:py-28 px-10`,
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-wide">
        Organic Products
        <span className="ml-2 font-alpina font-normal italic tracking-tight">curated for you</span>
      </h2>
      <p className="text-xl font-medium mt-2">Get personalized product picks from a Real Expert — for free.</p>
      <Button
        variant="outline"
        size="lg"
        className={twMerge(
          `mt-6 border-white uppercase w-fit bg-transparent rounded-3xl`,
          buttonClassName
        )}
      >
        Take our quiz
      </Button>
    </div>
  );
}
