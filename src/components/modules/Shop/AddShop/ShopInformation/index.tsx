import React, { useEffect } from 'react';

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

type Props = {
  types: String[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep, types }: Props) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors }
  } = useFormContext();

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
      <Title title="Shop Details" />
      <div className="space-y-1 w-full mt-3">
        <Label>Shop Name</Label>
        <Input
          className="w-full  placeholder:text-sm capitalize"
          type="text"
          placeholder="Enter Shop Name"
          {...register('name', { required: true })}
        />
        {errors.name && <span className="text-sm text-red-500">Shop Name doesn`t look valid</span>}
      </div>
      <div className="space-y-1 w-full mt-3">
        <Label >Tagline</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter tagline"
          {...register('tagline', { required: true })}
        />
        {errors.name && <span className="text-sm text-red-500">Tagline doesn`t look valid</span>}
      </div>
      <div className="space-y-1 mt-3 w-full">
        <Label>Shop Category</Label>
        <Select
          defaultValue={getValues('category')}
          onValueChange={handleChangeValue}
          {...register('category', { required: true })}
        >
          <SelectTrigger className="w-full capitalize">
            <SelectValue placeholder="Select shop category" />
          </SelectTrigger>
          <SelectContent>
            {types?.map((c: any, index: number) => (
              <SelectItem className="capitalize" key={index} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.type && <span className="text-sm text-red-500">Please select Shop Category</span>}
      </div>

      <div className="flex space-x-2 flex-row">
        <div className="space-y-1 w-full mt-3">
          <Label>Email</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            placeholder="Enter Email"
            {...register('email', { required: true })}
          />
          {errors.name && <span className="text-sm text-red-500">Email doesn`t look valid</span>}
        </div>
        <div className="space-y-1 w-full mt-3">
          <Label>Phone</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            placeholder="Enter Phone Number"
            {...register('phone', { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">Phone Number doesn`t look valid</span>
          )}
        </div>
      </div>
      <div className="space-y-1 w-full mt-3">
        <Label >Address</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Enter Shop Address"
          {...register('address', { required: true })}
        />
        {errors.name && <span className="text-sm text-red-500">Address doesn`t look valid</span>}
      </div>

      <Button
        type="button"
        onClick={nextStep}
        className="w-full py-2.5 rounded-lg  mt-5"
      >
        Next
      </Button>
    </>
  );
};

export default Index;
