import AddImages from '@/components/common/Seller/Shared/AddImages';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  images: any;
  isEdit: boolean;
  loading: boolean;
  dictionary: any;
};

const Index = ({ dictionary, setStep, images, isEdit, loading }: Props) => {
  return <AddImages dictionary={dictionary} setStep={setStep} isShop images={images} isEdit={isEdit} loading={loading} />;
};

export default Index;
