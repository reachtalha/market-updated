
import React from "react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return <span className='text-primary text-3xl font-semibold'>{title}</span>;
};

export default Title;
