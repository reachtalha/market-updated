import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import Title from '@/components/common/Seller/Shared/Title';

const UNITS = [
  { id: 'ml', label: 'Milli-litre' },
  { id: 'l', label: 'Litre' },
  { id: 'g', label: 'Gram' },
  { id: 'kg', label: 'Kilogram' },
  { id: 'size', label: 'Size' }
];

type Props = {
  types: String[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const BasicDetails = ({ types, setStep }: Props) => {
  const {
    register,
    trigger,
    formState: { errors },
    getValues
  } = useFormContext();

  const nextStep = async () => {
    const isValid = await trigger(['name', 'type', 'gender', 'unit', 'type', 'description']);
    if (isValid) setStep((e: number) => e + 1);
  };

  const handleOnChange = (selectedOption: string) => {
    register('type')?.onChange({
      target: {
        name: 'type',
        value: selectedOption
      }
    });
  };

  console.log(getValues('gender'));

  return (
    <>
      <Title title="Basic Details" />
      <div className="space-y-1 w-full mt-3 xl:mt-5 ">
        <Label>Product Name</Label>
        <Input
          className="w-full placeholder:text-sm"
          type="text"
          placeholder="Your Product Name"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span className="text-sm text-red-500">Product Name doesn`t look valid</span>
        )}
      </div>
      <div className="space-y-1 mt-3 xl:mt-5  w-full">
        <Label>Product Types</Label>
        <Select
          defaultValue={getValues('type') !== '' ? getValues('type') : undefined}
          onValueChange={handleOnChange}
        >
          <SelectTrigger className="w-full bg-white capitalize ">
            <SelectValue
              {...register('type', { required: true })}
              placeholder="Select Product Type"
            />
          </SelectTrigger>
          <SelectContent>
            {types?.map((c: any, index: number) => (
              <SelectItem className="capitalize" key={index} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.type && <span className="text-sm text-red-500">Please select product type</span>}
      </div>
      <div className="w-full mt-3 xl:mt-5 ">
        <Label>Gender</Label>
        <div className="flex flex-wrap gap-3 w-full">
          {['Male', 'Female', 'Unisex'].map((s, index) => (
            <div className="flex items-center gap-x-2 mt-1" key={index}>
              <Input
                id={index.toString()}
                type="radio"
                value={s}
                {...register('gender', { required: true })}
                defaultChecked={getValues('gender') ? getValues('gender') === s : index === 0}
                className="peer/gender accent-primary  w-4 h-4 bg-gray-100 border-gray-300 focus:ring-primary"
              />
              <Label
                htmlFor={index.toString()}
                className="peer-checked/gender:text-primary  text-sm font-medium"
              >
                {s}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-3 xl:mt-5 ">
        <Label className="font-medium text-base text-gray-600">Select Unit</Label>
        <div className="flex flex-wrap gap-3 w-full">
          {UNITS.map((s, index) => (
            <div className="flex items-center gap-x-2 mt-1" key={index}>
              <Input
                id={s.id}
                type="radio"
                value={s.id}
                {...register('unit', { required: true })}
                defaultChecked={getValues('unit') ? getValues('unit') === s : index === 0}
                className="peer/unit accent-primary w-4 h-4 bg-gray-100 border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={s.id} className="peer-checked/unit:text-primary text-sm font-medium ">
                {s.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1 mt-3 xl:mt-5  w-full">
        <Label>Description</Label>
        <textarea
          rows={4}
          className="resize-none w-full placeholder:text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 overflow-y-auto px-3 py-2 text-sm ring-offset-white border rounded-md"
          placeholder="Enter your product description"
          maxLength={280}
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && (
          <span className="text-sm text-red-500">Description doesn`t look valid</span>
        )}
      </div>

      <Button type="button" onClick={nextStep} variant="default" className="w-full xl:mt-8 mt-2 ">
        Next
      </Button>
    </>
  );
};

export default BasicDetails;
