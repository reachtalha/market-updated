import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';

type Props = {
  experts: any;
  dictionary: any;
};

const Experts = ({ experts, dictionary }: Props) => {
  return (
    <>
      {experts?.length === 0 ? (
        <p className="text-center py-16">No Experts Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {experts?.map((expert: any, i: number) => (
            <ExpertCard
              dictionary={dictionary}
              key={Math.random() + i + Date.now()}
              id={expert?.id}
              image={expert?.photoURL}
              name={expert?.name}
              title={expert?.topics}
              bio={expert?.bio}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Experts;
