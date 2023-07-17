import Image, {StaticImageData} from "next/image";
import { ReactNode } from "react";

type HeroProps = {
  img: StaticImageData;
  children: ReactNode;
  className?: string;
};
export default function Hero({ img, children, className }: HeroProps) {
  return (
    <section className={`h-screen ${className}`}>
      <Image
        src={img}
        fill
        className="object-cover object-center -z-10"
        alt="hero"
      />
      {children}
    </section>
  );
}
