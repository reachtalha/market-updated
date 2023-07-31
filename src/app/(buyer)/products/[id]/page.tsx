import BoxedContent from '@/components/common/BoxedContent';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import Product from '@/components/common/Buyer/Products/ProductDetails';

export default function Page(){
  return <BoxedContent className="py-20">
    <Product />
    <div className="py-5 md:py-10">
      <OrganicSimplifiedSection />
    </div>
  </BoxedContent>
}