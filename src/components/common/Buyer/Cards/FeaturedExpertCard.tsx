import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export type Expert = {
  id: string;
  name: string;
  bio: string;
  photoURL: string;
};

type ExpertCardProps = {
  expert: Expert;
};

export default function FeaturedExpertCard({ expert }: ExpertCardProps) {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundImage: `url(${expert.photoURL})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      className="h-[300px] sm:h-[400px] lg:h-[562px] flex  relative  rounded-xl"
    >
      <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/30 to-transparent transition-opacity ease-in duration-300" />

      <span className="absolute text-xs uppercase z-10 bg-white left-4 top-4 py-1.5 px-6 rounded-lg">
        featured expert
      </span>

      <div className="px-6 pb-10 z-10 text-white mt-20 md:self-end">
        <h6 className="text-3xl md:text-4xl lg:text-5xl">{expert.name}</h6>
        <p className="mb-8 mt-3 line-clamp-3">{expert.bio}</p>
        <Button
          variant="outline"
          size="resp"
          className="uppercase w-fit bg-transparent text-white rounded-3xl"
          onClick={() => router.push('/experts/' + expert.id)}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
