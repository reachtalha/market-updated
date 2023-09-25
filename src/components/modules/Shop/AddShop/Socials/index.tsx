import React, { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import Title from '@/components/common/Seller/Shared/Title';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isEdit?: boolean;
  dictionary: any;
};

const Index = ({ dictionary, setStep, isEdit = false }: Props) => {
  const {
    register,
    trigger,
    formState: { errors }
  } = useFormContext();
  const [editMode, setEditMode] = useState(false);

  const nextStep = async () => {
    const isValid = await trigger(['fbUrl', 'websiteUrl', 'twitterUrl', 'instaUrl']);
    if (isValid) setStep((e: number) => e + 1);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full ">
        <Title title={dictionary.seller.shop.socialsForm.heading} subTitle={'(Optional)'} />
        {isEdit && (
          <Pencil
            className="cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => setEditMode(true)}
            size={17}
          />
        )}
      </div>

      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.socialsForm.fb.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.socialsForm.fb.placeholder}
          {...register('fbUrl')}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.socialsForm.fb.error}</span>}
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.socialsForm.insta.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.socialsForm.insta.placeholder}
          {...register('instaUrl')}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.socialsForm.insta.error}</span>}
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.socialsForm.twitter.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.socialsForm.twitter.placeholder}
          {...register('twitterUrl')}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.socialsForm.twitter.error}</span>}
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.socialsForm.website.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.socialsForm.website.placeholder}
          {...register('websiteUrl')}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.socialsForm.website.error}</span>}
      </div>
      <div className="flex gap-x-2 mt-5 xl:mt-8">
        {!isEdit && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep((prev) => prev - 1)}
            className="w-1/2"
          >
            Back
          </Button>
        )}

        {(!isEdit || editMode) && (
          <Button
            type={isEdit && editMode ? 'submit' : 'button'}
            onClick={isEdit ? () => {} : nextStep}
            variant="default"
            className={isEdit ? 'w-full' : 'w-1/2'}
          >
            {isEdit && editMode ? 'Update' : 'Next'}
          </Button>
        )}
      </div>
    </>
  );
};

export default Index;
