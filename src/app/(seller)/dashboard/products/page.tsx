"use client";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import CreateSKU from "./CreateSKU";

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
          step <= currentStep && "bg-primary text-white"
        }`}
      >
        {step}
      </div>

      <span className='w-[100%] font-medium text-center mt-1'>{title}</span>
    </div>
  );
};

const Products = (props: Props) => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className='bg-white h-screen py-10'>
      <div className='flex flex-row items-center   relative  w-[60%] mx-auto'>
        <Step
          currentStep={step}
          setCurrentStep={setStep}
          title='Personal Information'
          step={1}
        />
        <hr
          className={`border ms-[-20px] translate-y-[-25px] w-[52%] transition-all duration-500 border-[#414D354D] ${
            step > 1 && "border-primary"
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
      <div className='w-[50%] m-auto mt-5'>
        {/* <BasicDetails setStep={setStep} /> */}
        <CreateSKU setStep={setStep} />
      </div>
    </div>
  );
};

export default Products;
