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
    formState: { errors }
  } = useFormContext();
  console.log(register('type').name);

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

  return (
    <>
      <Title title="Basic Details" />
      <div className="space-y-1 w-full mt-3">
        <Label className="text-base font-medium  text-gray-600">Product Name</Label>
        <Input
          className="w-full  rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem] "
          type="text"
          placeholder="Your Product Name"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <span className="text-sm text-red-500">Product Name doesn`t look valid</span>
        )}
      </div>
      <div className="space-y-1 mt-3 w-full">
        <Label className="font-medium text-base text-gray-600">Product Types</Label>
        <Select onValueChange={handleOnChange}>
          <SelectTrigger className="w-full  bg-white rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]">
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

      <div className="w-full mt-3">
        <Label className="font-medium text-base text-gray-600">Gender</Label>
        <div className="flex flex-wrap gap-3 w-full">
          {['Male', 'Female', 'Unisex'].map((s, index) => (
            <div className="flex items-center gap-x-2 mt-1" key={index}>
              <Input
                id={index.toString()}
                type="radio"
                value={s}
                {...register('gender', { required: true })}
                defaultChecked={index === 0 ? true : false}
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

      <div className="w-full mt-3">
        <Label className="font-medium text-base text-gray-600">Select Unit</Label>
        <div className="flex flex-wrap gap-3 w-full">
          {UNITS.map((s, index) => (
            <div className="flex items-center gap-x-2 mt-1" key={index}>
              <Input
                id={s.id}
                type="radio"
                value={s.id}
                {...register('unit', { required: true })}
                defaultChecked={index === 0 ? true : false}
                className="peer/unit accent-primary w-4 h-4 bg-gray-100 border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={s.id} className="peer-checked/unit:text-primary text-sm font-medium ">
                {s.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1 mt-3 w-full">
        <Label className="font-medium text-base text-gray-600">Description</Label>
        <textarea
          rows={4}
          className="resize-none w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm overflow-y-auto  focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]"
          placeholder="Enter your product description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && (
          <span className="text-sm text-red-500">Description doesn`t look valid</span>
        )}
      </div>
      <Button
        type="button"
        onClick={nextStep}
        className="w-full py-2.5  border border-white hover:border-primary hover:text-primary hover:bg-white duration-500 transition-colors rounded-lg text-white bg-primary mt-2"
      >
        Next
      </Button>
    </>
  );
};

export default BasicDetails;
