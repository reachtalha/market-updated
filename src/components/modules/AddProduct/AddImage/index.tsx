import AddImages from '@/components/common/Seller/Shared/AddImages';
import React from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
};

const Index = ({ setStep, loading }: Props) => {
  return <AddImages setStep={setStep} loading={loading} />;
};

export default Index;
