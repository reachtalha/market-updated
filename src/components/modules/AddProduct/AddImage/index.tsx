import AddImages from '@/components/common/Seller/Shared/AddImages';
import React from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep }: Props) => {
  return <AddImages setStep={setStep} />;
};

export default Index;
