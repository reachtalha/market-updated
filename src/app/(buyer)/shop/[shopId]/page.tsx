import Link from "next/link";

import Hero from "@/common/Hero";
import BoxedContent from "@/common/BoxedContent";
import heroImg from "@/assets/images/shop-hero.png";
import CircledArrowRight from "@/assets/icons/system/CircledArrowRight";

type ShopProps = {
  params: {
    shopId: string
  }
}

export default function Shop({ params }: ShopProps){
  return <>
    <Hero className="w-full overflow-hidden text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent" img={heroImg}>
      <BoxedContent className="flex items-end  w-full h-full">
        <header className="flex w-full justify-between items-center mb-14">
          <div>
            <h1 className="text-7xl font-medium mb-2">SALT & STONE</h1>
            <p className="text-lg">Skincare and self-care for a life lived in motion.</p>
          </div>
          <Link className="self-end flex items-center gap-4 text-lg" href="/shops">
            <span className="uppercase">similar shops</span>
            <CircledArrowRight className="text-transparent" />
          </Link>
        </header>
      </BoxedContent>
    </Hero>
  </>
}