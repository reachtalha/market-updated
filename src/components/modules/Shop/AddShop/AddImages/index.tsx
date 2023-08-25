import AddImages from '@/components/common/Seller/Shared/AddImages';
import React from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  images: any;
  isEdit: boolean;
  loading: boolean;
};

const Index = ({ setStep, images, isEdit, loading }: Props) => {
  return <AddImages setStep={setStep} isShop images={images} isEdit={isEdit} loading={loading} />;
};

export default Index;
