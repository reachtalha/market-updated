import React from "react";

type Props = {
  title: string;
  subTitle?: string;
};

const Title = ({ title, subTitle }: Props) => {
  return (
    <span className='text-primary text-3xl font-semibold'>
      {title} <span className='text-xl font-normal'>{subTitle}</span>
    </span>
  );
};

export default Title;
