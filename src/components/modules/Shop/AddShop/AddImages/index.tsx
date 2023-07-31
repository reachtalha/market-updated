import AddImages from '@/components/common/Seller/Shared/AddImages';
import React from 'react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  images: any;
  isEdit: boolean;
};

const Index = ({ setStep, images, isEdit }: Props) => {
  return <AddImages setStep={setStep} isShop images={images} isEdit={isEdit} />;
};

export default Index;
