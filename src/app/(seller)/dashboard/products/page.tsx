"use client";
import React, { useState } from "react";

type Props = {};

const Step = ({
  title,
  step,
  setCurrentStep,
  currentStep,
}: {
  title: string;
  step: number;
  currentStep: number;
  setCurrentStep: Function;
}) => {
  return (
    <div className='flex flex-1 items-center flex-col'>
      <div
        onClick={() => setCurrentStep(step)}
        className={`bg-[#414D354D] cursor-pointer transition-all duration-500  w-[3rem] h-[3rem] rounded-full flex items-center justify-center font-bold ${
          step <= currentStep && "bg-[#414D35] text-white"
        }`}
      >
        {step}
      </div>

      <span className='w-[100%] font-medium text-center mt-1'>{title}</span>
    </div>
  );
};

const ConnectionLine = () => {
  return (
    <div className='absolute top-[25%] left-[25%] translate-x-[-3%] translate-y-[-25%] w-[60%]   flex flex-row items-center justify-between '>
      <hr className='h-[2px]  w-[48%]  bg-[#414D354D] ' />
      <hr className='h-[2px]  w-[39.5%] me-2  bg-[#414D354D]' />
    </div>
  );
};

const Products = (props: Props) => {
  const [step, setStep] = useState(1);
  return (
    <div className='bg-white h-screen py-20'>
      <div className='flex flex-row items-center   relative  w-[60%] mx-auto'>
        <Step
          currentStep={step}
          setCurrentStep={setStep}
          title='Personal Information'
          step={1}
        />
        <hr
          className={`border ms-[-20px] translate-y-[-25px] w-[52%] transition-all duration-500 border-[#414D354D] ${
            step > 1 && "border-[#414D35]"
          }  `}
        />
        <Step
          currentStep={step}
          setCurrentStep={setStep}
          title='Create SKU'
          step={2}
        />
        <hr
          className={`border translate-y-[-25px] w-[48%] transition-all duration-500 bg-[#414D354D] ${
            step > 2 && "border-[#414D35]"
          } `}
        />
        <Step
          currentStep={step}
          setCurrentStep={setStep}
          title='Add Image'
          step={3}
        />
      </div>
    </div>
  );
};

export default Products;
