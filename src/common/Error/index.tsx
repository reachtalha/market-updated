import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Error = ({ ...props }) => {
  return (
    <div {...props}>
      <div>
        <ExclamationTriangleIcon className="text-red-500 w-8 h-8" />
        <h6>For some reason, we couldn&lsquo;t load</h6>
      </div>
    </div>
  );
};

export default Error;
