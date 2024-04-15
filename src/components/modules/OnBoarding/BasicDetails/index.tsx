'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';

import { Country, City } from 'country-state-city';

import { ImageIcon } from '@radix-ui/react-icons';
import Image from '@/components/common/FallbackImage';
import ImageReader from '@/utils/handlers/image/ImageReader';

interface IBasicDetails {
  setStep: Dispatch<SetStateAction<number>>;
  role: string;
}
const BasicDetails = ({ setStep, role }: IBasicDetails) => {
  const [image, setImage] = useState<string>();
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch
  } = useFormContext();
  const selectedCountry = watch('country');

  const handleImageChange = ImageReader({ setImage, size: 5 });

  const handleOnChange = (name: string, selectedOption: string) => {
    register(name)?.onChange({
      target: {
        name: name,
        value: selectedOption
      }
    });
  };
  const handleCountry = (selectedOption: string) => {
    handleOnChange('country', selectedOption);
  };
  const handleCity = (selectedOption: string) => {
    handleOnChange('city', selectedOption);
  };
  const handleCountryCode = (selectedOption: string) => {
    handleOnChange('countryCode', selectedOption);
  };

  const nextStep = async () => {
    const isValid = await trigger(['address', 'country', 'zipcode', 'phone', 'city']);
    if (isValid) {
      setValue('image', image);
      setStep(2);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h4 className="text-primary font-semibold text-2xl">Get Started</h4>
        <p className="text-neutral-600">Help us to create a better experience for you</p>
      </div>
      <div className="mt-3 w-full">
        <div className="w-fit mx-auto">
          <Label
            htmlFor="o-image"
            className="relative text-base cursor-pointer overflow-hidden border-2 h-32 w-36 gap-y-2 rounded-md flex flex-col items-center justify-center border-neutral-500 border-dotted"
          >
            {image ? (
              <Image src={image} fill alt="image" style={{ objectFit: 'cover' }} />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-neutral-500" />
                <p className={image ? 'hidden' : ' text-sm text-center block m-0'}>
                  Add profile picture
                </p>
              </>
            )}
            <input type="file" id="o-image" hidden onChange={handleImageChange} />
          </Label>
        </div>
      </div>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <Label>Country</Label>
          <Select onValueChange={handleCountry}>
            <SelectTrigger>
              <SelectValue
                {...register('country', { required: true })}
                placeholder="Select country"
              />
            </SelectTrigger>
            <SelectContent className="max-h-56">
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {Country.getAllCountries().map((c) => (
                  <SelectItem key={c.isoCode} value={c.isoCode}>
                    {c.flag}-{c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.country && <span className="text-sm text-red-500">Please select country</span>}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <Label>City</Label>
          <Select onValueChange={handleCity}>
            <SelectTrigger>
              <SelectValue {...register('city', { required: true })} placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="max-h-56">
              <SelectGroup>
                <SelectLabel className="capitalize">{selectedCountry} Cities</SelectLabel>
                {City.getCitiesOfCountry(selectedCountry)?.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.city && <span className="text-sm text-red-500">Please select city</span>}
        </div>
      </div>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <Label>Contact</Label>
          <div className="flex gap-x-1.5">
            <Select onValueChange={handleCountryCode}>
              <SelectTrigger className="w-14">
                <SelectValue {...register('countryCode', { required: true })} placeholder="CC" />
              </SelectTrigger>
              <SelectContent className="max-h-56">
                <SelectGroup>
                  <SelectLabel className="capitalize">Country Code</SelectLabel>
                  {Country.getAllCountries().map((c) => (
                    <SelectItem key={c.phonecode} value={c.phonecode}>
                      {c.phonecode}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="text"
              className="w-full placeholder:text-sm"
              placeholder="Your Contact"
              {...register('phone', {
                required: true
              })}
            />
          </div>
          {errors.countryCode && (
            <span className="text-sm text-red-500">Please select country code</span>
          )}
          {errors.phone && <span className="text-sm text-red-500">Make sure its right</span>}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <Label>Zipcode</Label>
          <Input
            type="text"
            inputMode="numeric"
            className="w-full placeholder:text-sm"
            placeholder="Your Zipcode"
            {...register('zipcode', {
              required: true,
              pattern: /^[0-9]+$/
            })}
          />
          {errors.zipcode && (
            <span className="text-sm text-red-500">Incorrect zipcode, try again!</span>
          )}
        </div>
      </div>
      <div className="w-full mt-3 space-y-1">
        <Label>Address</Label>
        <Input
          type="text"
          inputMode="text"
          className="w-full  placeholder:text-sm"
          placeholder="Your Address"
          {...register('address', {
            required: true
          })}
        />
        {errors.address && (
          <span className="text-sm text-red-500">Is your address spelled right?</span>
        )}
      </div>
      {role !== 'seller' && (
        <Button type="button" onClick={nextStep} className=" mt-3 w-full">
          Next
        </Button>
      )}
    </>
  );
};

export default BasicDetails;
