import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import Title from '@/components/common/Seller/Shared/Title';
import { Pencil } from 'lucide-react';

type Props = {};

const Index = (props: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleValueChange = () => {
    console.log('value changed');
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <Title title={'Card Information'} />
        {!isEdit && (
          <div
            onClick={() => setIsEdit(true)}
            className="flex gap-x-2 flex-row items-center cursor-pointer "
          >
            <span>Edit</span>
            <Pencil size={15} />
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-row gap-x-3">
          <div className="space-y-1 w-full mt-3">
            <Label className=" font-medium text-base  text-gray-600">Name</Label>
            <Input
              className="w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]"
              type="text"
              disabled={!isEdit}
              placeholder="Enter Card Holder's Name"
            />
          </div>
          <div className="space-y-1 w-full mt-3">
            <Label className="text-base font-medium  text-gray-600">Card Type</Label>
            <Select disabled={!isEdit} onValueChange={handleValueChange}>
              <SelectTrigger className="w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]">
                <SelectValue defaultValue={'mastercard'} placeholder="Select Card" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mastercard">Master Card</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="union pay">Union Pay</SelectItem>
                <SelectItem value="americanexpress">American Express</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-base font-medium  text-gray-600">Card Number</Label>
          <Input
            className="w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]"
            type="text"
            disabled={!isEdit}
            placeholder="4444 4444 4444 4444"
          />
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="space-y-1 w-full mt-3">
            <Label className="text-base font-medium  text-gray-600">CVC</Label>
            <Input
              className="w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]"
              type="text"
              placeholder="123"
              disabled={!isEdit}
            />
          </div>
          <div className="space-y-1 w-full mt-3">
            <Label className="text-base font-medium  text-gray-600">Expiry Date</Label>
            <Input
              className="w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px]  focus:border-0 py-[1.4rem]"
              type="text"
              disabled={!isEdit}
              placeholder="MM/YY"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-x-2 mt-4">
        {isEdit && (
          <Button
            type="button"
            className="w-full py-2.5 bg-gray-200 hover:bg-killarney-200 duration-300 transition-colors rounded-md text-black"
          >
            Cancel
          </Button>
        )}

        <Button
          type="button"
          className="disabled:cursor-not-allowed w-full py-2.5 bg-transparent hover:bg-killarney-800 duration-300 transition-colors rounded-md text-primary border-2 border-primary"
        >
          Add Card
        </Button>
      </div>
    </div>
  );
};

export default Index;
