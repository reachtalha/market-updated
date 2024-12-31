import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeroProps = {
  img: StaticImageData | string;
  children: ReactNode;
  className?: string;
};
export default function Hero({ img, children, className }: HeroProps) {
  return (
    <section className={cn('h-screen', className)}>
      <Image src={img} fill className="object-cover object-center -z-10" alt="hero" priority />

      {children}
    </section>
  );
}
