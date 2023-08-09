import React from 'react';

type Props = {};
const Step = ({
  title,
  step,

  currentStep
}: {
  title: string;
  step: number;
  currentStep: number;
}) => {
  return (
    <div className="flex flex-1 items-center flex-col">
      <div
        className={`bg-[#414D354D]  transition-all duration-500 z-20  w-[3rem] h-[3rem] rounded-full flex items-center justify-center font-bold ${
          step <= currentStep && 'bg-primary text-white'
        }`}
      >
        {step}
      </div>

      <span className="w-[100%] font-medium text-center mt-1">{title}</span>
    </div>
  );
};

interface StepperProps {
  step: number;
  addProduct?: boolean;
  data: {
    title: string;
    step: number;
  }[];
}

// Shops form has three steps while product form has 4
// we have to conditionally render to accomodate both
const Stepper = ({ step, data, addProduct }: StepperProps) => {
  return (
    <div className="flex flex-row items-center   relative w-[90%]  md:w-[70%] lg:w-[60%] mx-auto">
      <Step currentStep={step} title={data[0].title} step={data[0].step} />
      <hr
        className={`border ms-[-20px] translate-y-[-25px] w-[52%] transition-all duration-500 border-[#414D354D] ${
          step > 1 && 'border-primary'
        } ${addProduct && 'w-[33%] '}  `}
      />
      <Step currentStep={step} title={data[1].title} step={data[1].step} />
      <hr
        className={`border translate-y-[-25px] w-[48%] transition-all duration-500 bg-[#414D354D] ${
          step > 2 && 'border-[#414D35]'
        } ${addProduct && 'w-[33%] -me-[19px] '}  `}
      />
      {addProduct && (
        <>
          <Step currentStep={step} title={data[2].title} step={data[2].step} />
          <hr
            className={`border translate-y-[-25px] ms-[-19px] w-[40%] transition-all duration-500 bg-[#414D354D] ${
              step > 2 && 'border-[#414D35]'
            } `}
          />
        </>
      )}
      <Step
        currentStep={step}
        title={data[addProduct ? 3 : 2].title}
        step={data[addProduct ? 3 : 2].step}
      />
    </div>
  );
};

export default Stepper;
