import React from 'react';

import { useFormContext } from 'react-hook-form';
import Title from '@/components/common/Seller/Shared/Title';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep }: Props) => {
  const {
    register,
    trigger,
    formState: { errors }
  } = useFormContext();

  const nextStep = async () => {
    const isValid = await trigger(['fbUrl', 'websiteUrl', 'twitterUrl', 'instaUrl']);
    if (isValid) setStep((e: number) => e + 1);
  };
  return (
    <>
      <Title title="Shop Socials" subTitle={'(Optional)'} />
      <div className="space-y-1 w-full mt-3">
        <Label>Facebook URL</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter Facebook URL"
          {...register('fbUrl')}
        />
        {errors.name && <span className="text-sm text-red-500">URL doesn`t look valid</span>}
      </div>
      <div className="space-y-1 w-full mt-3">
        <Label>Instagram URL</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter Instagram URL"
          {...register('instaUrl')}
        />
        {errors.name && <span className="text-sm text-red-500">URL doesn`t look valid</span>}
      </div>
      <div className="space-y-1 w-full mt-3">
        <Label>Twitter URL</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter Twitter URL"
          {...register('twitterUrl')}
        />
        {errors.name && <span className="text-sm text-red-500">URL doesn`t look valid</span>}
      </div>
      <div className="space-y-1 w-full mt-3">
        <Label>Website URL</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter Website URL"
          {...register('websiteUrl')}
        />
        {errors.name && <span className="text-sm text-red-500">URL doesn`t look valid</span>}
      </div>
      <div className="flex gap-x-2 mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep((prev) => prev - 1)}
          className="w-1/2"
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          variant="default"
          className="w-1/2"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Index;
