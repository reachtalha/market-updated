import Link from 'next/link';
import Image from '@/components/common/FallbackImage';
import ExpertCard from './ExpertCard';

export type Expert = {
  id: string;
  name: string;
  bio: string;
  photoURL: string;
  topics: string[];
};

type ExpertCardProps = {
  expert: Expert;
  dictionary: any;
};

export default function FeaturedExpertCard({ expert, dictionary }: ExpertCardProps) {
  return (
    <div className="h-[300px] sm:h-[400px] lg:h-[562px] flex  relative  rounded-xl overflow-hidden">
      <Image src={expert.photoURL} fill className="object-cover" alt="" />
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />
      <Link
        href={`experts/?category=${expert.topics?.length > 0 ? expert.topics[0] : 'all'}`}
        className="capitalize z-10 text-sm absolute cursor-pointer top-4 left-4 bg-white p-1 px-3 rounded-lg"
      >
        {expert.topics && expert.topics[0]} {dictionary.market.featuredExperts.expertLabel}
      </Link>

      <div className="px-6 pb-10 z-10 text-white mt-20 md:self-end">
        <h6 className="text-3xl md:text-4xl capitalize lg:text-5xl">{expert.name}</h6>
        <p className="mb-8 mt-3 line-clamp-3">{expert.bio}</p>
        <Link
          className="uppercase w-fit bg-transparent border duration-300 transition-opacity ease-in border-neutral-50 text-white rounded-full px-6 py-2.5 hover:bg-neutral-50 hover:text-black"
          href={'/experts/' + expert.id}
        >
          {dictionary.market.featuredExperts.exploreExpertBtnLabel}
        </Link>
      </div>
    </div>
  );
}
