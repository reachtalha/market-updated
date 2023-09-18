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
};

export default function FeaturedExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="h-[300px] sm:h-[400px] lg:h-[562px] flex  relative  rounded-xl overflow-hidden">
      <ExpertCard
        id={expert.id}
        name={expert.name}
        bio={expert.bio}
        image={expert.photoURL}
        title={expert.topics}
        featured={true}
      />
    </div>
  );
}
