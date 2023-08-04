'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
          <Label className="text-sm text-neutral-600">Country</Label>

          <select
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:outline-neutral-800"
            {...register('country', {
              required: true
            })}
            aria-label="select country"
          >
            <option disabled aria-disabled selected value="">
              Select Country
            </option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.flag}-<span>{c.name}</span>
              </option>
            ))}
          </select>
          {errors.country && <span className="text-sm text-red-500">Please select country</span>}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <Label className="text-sm text-neutral-600">City</Label>
          <select
            className="w-full rounded-xl border-[2px] border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:outline-neutral-800"
            aria-label="select city"
            {...register('city', {
              required: true
            })}
          >
            <option disabled aria-disabled selected value="">
              Select City
            </option>
            {City.getCitiesOfCountry(selectedCountry)?.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          {errors.city && <span className="text-sm text-red-500">Please select city</span>}
        </div>
      </div>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <Label className="text-sm text-neutral-600">Contact</Label>
          <div className="w-full flex overflow-hidden rounded-xl border-[2px] border-neutral-200  transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus-within:outline-neutral-800">
            <select
              className="py-2 text-center text-sm pl-2 text-gray-700  focus:outline-none w-16"
              aria-labelledby="country-code-button"
              {...register('countryCode', {
                required: true
              })}
            >
              <option value="" selected disabled>
                CC
              </option>
              {Country.getAllCountries().map((c) => (
                <option key={c.phonecode + Math.random()} value={c.phonecode}>
                  {c.phonecode}
                </option>
              ))}
            </select>
            <Input
              type="text"
              className="block w-full focus:!outline-none border-0 focus:!border-0  py-2.5 px-1 placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
          <Label className="text-sm text-neutral-600">Zipcode</Label>
          <Input
            type="text"
            inputMode="numeric"
            className="w-full rounded-xl border-[2px] focus:!border-0  border-neutral-200 p-2.5  transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:-translate-y-[2px] focus:outline-neutral-800"
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
        <Label className="text-sm text-neutral-600">Address</Label>
        <Input
          type="text"
          inputMode="text"
          className="w-full rounded-xl border-[2px] focus:!border-0   border-neutral-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800 focus:-translate-y-[2px] focus:outline-neutral-800"
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
        <Button
          type="button"
          onClick={nextStep}
          className="bg-primary opacity-90 hover:opacity-100 mt-3  rounded-md duration-300 transition-colors w-full text-white py-2.5"
        >
          Next
        </Button>
      )}
    </>
  );
};

export default BasicDetails;
