import React, { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import Title from '@/components/common/Seller/Shared/Title';
import { PenBox, Pencil } from 'lucide-react';

type Props = {
  types: String[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isEdit?: boolean;
  dictionary: any;
};

const Index = ({ dictionary, setStep, types, isEdit = false }: Props) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors }
  } = useFormContext();
  const [editMode, setEditMode] = useState(false);

  const nextStep = async () => {
    const isValid = await trigger(['name', 'category', 'tagline', 'phone', 'address', 'email']);
    if (isValid) setStep((e: number) => e + 1);
  };
  const handleChangeValue = (value: any) => {
    register('category')?.onChange({
      target: {
        name: 'category',
        value: value
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between w-full ">
        <Title title={dictionary.seller.shop.shopInfoForm.heading} />
        {isEdit && (
          <Pencil className="cursor-pointer" onClick={() => setEditMode(true)} size={17} />
        )}
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.shopInfoForm.name.label}</Label>
        <Input
          className="w-full placeholder:text-sm capitalize"
          type="text"
          placeholder={dictionary.seller.shop.shopInfoForm.name.placeholder}
          {...register('name', { required: true })}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.name.error}</span>}
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.shopInfoForm.tagline.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.shopInfoForm.tagline.placeholder}
          {...register('tagline', { required: true })}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.tagline.error}</span>}
      </div>
      <div className="space-y-1 mt-3 xl:mt-5 w-full">
        <Label>{dictionary.seller.shop.shopInfoForm.tagline.category}</Label>
        <Select
          defaultValue={getValues('category') !== '' ? getValues('category') : undefined}
          onValueChange={handleChangeValue}
          disabled={isEdit && !editMode}
        >
          <SelectTrigger className="w-full bg-white capitalize">
            <SelectValue placeholder={dictionary.seller.shop.shopInfoForm.category.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {types?.map((c: any, index: number) => (
              <SelectItem className="capitalize" key={index} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.type && <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.category.error}</span>}
      </div>

      <div className="flex space-x-2 flex-row">
        <div className="space-y-1 w-full mt-3 xl:mt-5">
          <Label>{dictionary.seller.shop.shopInfoForm.email.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            placeholder={dictionary.seller.shop.shopInfoForm.email.placeholder}
            {...register('email', { required: true })}
            disabled={isEdit && !editMode}
          />
          {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.email.error}</span>}
        </div>
        <div className="space-y-1 w-full mt-3 xl:mt-5">
          <Label>{dictionary.seller.shop.shopInfoForm.phone.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            placeholder={dictionary.seller.shop.shopInfoForm.phone.placeholder}
            {...register('phone', { required: true })}
            disabled={isEdit && !editMode}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.phone.error}</span>
          )}
        </div>
      </div>
      <div className="space-y-1 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.shop.shopInfoForm.address.label}</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder={dictionary.seller.shop.shopInfoForm.address.placeholder}
          {...register('address', { required: true })}
          disabled={isEdit && !editMode}
        />
        {errors.name && <span className="text-sm text-red-500">{dictionary.seller.shop.shopInfoForm.address.error}</span>}
      </div>

      {(!isEdit || editMode) && (
        <Button
          type={isEdit && editMode ? 'submit' : 'button'}
          onClick={isEdit ? () => {} : nextStep}
          className="w-full py-2.5 rounded-lg  mt-5 xl:mt-8"
        >
          {isEdit && editMode ? ' Update' : ' Next'}
        </Button>
      )}
    </>
  );
};

export default Index;
