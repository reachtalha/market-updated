import React from "react";

type Props = {
  step: number;
  setStep: Function;
  data: {
    title: string;
    step: number;
    icon: React.ReactNode;
  }[];
};

function EditNavbar({ step, setStep, data }: Props) {
  return (
    <div className='absolute w-full right-0 top-0  flex flex-row items-center border-b  border-b-gray-400 h-12 space-x-5 px-3'>
      {data.map((item: any, index: any) => (
        <div
          key={index}
          onClick={() => setStep(item.step)}
          className={`flex flex-row cursor-pointer  space-x-2 items-center relative`}
        >
          <span
            className={`text-gray-400 transition-all duration-500 ${
              step === item.step && " text-primary"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-sm text-gray-400 after:h-[2px] transition-all duration-500 ${
              step === item.step &&
              " after:bg-primary after:absolute after:top-[167%] after:left-0 after:w-[100%] text-primary"
            } `}
          >
            {" "}
            {item.title}{" "}
          </span>
        </div>
      ))}
    </div>
  );
}

export default EditNavbar;
