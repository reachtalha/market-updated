import { Button } from '@/components/ui/button';

export type Expert = {
  name: string;
  description: string;
};

type ExpertCardProps = {
  expert: Expert;
};

export default function FeaturedExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="h-[300px] sm:h-[400px] lg:h-[562px] flex  relative bg-[#505050] rounded-xl">
      <span className="absolute text-xs uppercase bg-white left-4 top-4 py-1.5 px-6 rounded-lg">
        featured expert
      </span>

      <div className="px-6 pb-10 text-white mt-20 md:self-end">
        <h6 className="text-3xl md:text-4xl lg:text-5xl">{expert.name}</h6>
        <p className="mb-8 mt-3 line-clamp-3">{expert.description}</p>
        <Button
          variant="outline"
          size="resp"
          className="uppercase w-fit bg-transparent text-white rounded-3xl"
        >
          Explore Shop
        </Button>
      </div>
    </div>
  );
}
