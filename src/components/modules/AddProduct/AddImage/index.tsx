import AddImages from '@/components/common/Seller/Shared/AddImages';
import React from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
  isEdit?: boolean;
  images?: any;
};

const Index = ({ setStep, loading, isEdit, images }: Props) => {
  return <AddImages isEdit={isEdit} images={images} setStep={setStep} loading={loading} />;
};

export default Index;
