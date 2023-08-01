import ProductDetailsImg from '@/assets/images/product-details-img.png'
import Image from 'next/image';
export default function BlogCard(){
  return (<div className="w-full h-full relative">
    <header className="absolute bottom-4 left-4 text-white">
      <h3 className="uppercase font-medium text-lg">
        Sustainability
      </h3>
      <p>Sustainable packaging made from post consumer recycled materials. Made with 60% less plastic than bottles.</p>
    </header>
    <Image className="w-full h-full object-cover rounded-lg" src={ProductDetailsImg} alt="product details" />
  </div>)
}