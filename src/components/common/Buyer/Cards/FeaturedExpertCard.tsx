import { Button } from "@/components/ui/button";

export type Expert = {
  name: string;
  description: string;
};

type ExpertCardProps = {
  expert: Expert;
};

export default function FeaturedExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className='flex h-[562px] relative bg-[#505050] rounded-xl'>
      <span className='absolute text-xs uppercase bg-white left-4 top-4 py-1.5 px-6 rounded-lg'>
        featured expert
      </span>

      <div className='pl-6 pb-10 text-white self-end'>
        <h6 className='text-5xl'>{expert.name}</h6>
        <p className='mb-8 mt-3'>{expert.description}</p>
        <Button
          variant='outline'
          size='lg'
          className='uppercase w-fit bg-transparent text-white rounded-3xl'
        >
          Explore Shop
        </Button>
      </div>
    </div>
  );
}
