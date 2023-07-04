import React from "react";

const Expert = ({ params }: { params: { expertId: string } }) => {
  return <div>Expert {params.expertId}</div>;
};

export default Expert;
