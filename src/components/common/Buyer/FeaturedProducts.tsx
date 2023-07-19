import Carousel from "@/components/common/Carousel";
import Product from "@/components/common/Buyer/Cards/Product";
import product1 from "@/assets/images/product1.webp";

export default function FeaturedProducts(){
  return <Carousel title="Featured Products">
    {Array.from("abcfg").map((_, i: number) => (
      <Product
        key={i + Math.random()}
        image={product1}
        name="  LIGHTWEIGHT SHEER DAILY SUNSCREEN SPF 40"
        price={23}
        shop="Salt & Stone"
        type="Best Sellers"
        shrink={false}
      />
    ))}
  </Carousel>
}