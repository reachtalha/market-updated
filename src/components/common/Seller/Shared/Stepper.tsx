import React from "react";

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

interface StepperProps {
  step: number;
  setStep: Function;
  data: {
    title: string;
    step: number;
  }[];
}
const Stepper = ({ step, setStep, data }: StepperProps) => {
  return (
    <div className='flex flex-row items-center   relative w-[90%]  md:w-[70%] lg:w-[60%] mx-auto'>
      <Step
        currentStep={step}
        setCurrentStep={setStep}
        title={data[0].title}
        step={data[0].step}
      />
      <hr
        className={`border ms-[-20px] translate-y-[-25px] w-[52%] transition-all duration-500 border-[#414D354D] ${
          step > 1 && "border-primary"
        }  `}
      />
      <Step
        currentStep={step}
        setCurrentStep={setStep}
        title={data[1].title}
        step={data[1].step}
      />
      <hr
        className={`border translate-y-[-25px] w-[48%] transition-all duration-500 bg-[#414D354D] ${
          step > 2 && "border-[#414D35]"
        } `}
      />
      <Step
        currentStep={step}
        setCurrentStep={setStep}
        title={data[2].title}
        step={data[2].step}
      />
    </div>
  );
};

export default Stepper;
