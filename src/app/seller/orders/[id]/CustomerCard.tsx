import ImageWithFallback from '@/components/common/FallbackImage';
import EmailIcon from '@/assets/icons/social/Email';
type CustomerCardProps = {
  name: string;
  email: string;
  address: string;
  image: string;
};
function CustomerCard({ name, email, address, image }: CustomerCardProps) {
  return (
    <div
      className={`border-gray-400 border p-5 flex rounded-xl gap-y-2   flex-col w-full cursor-pointer`}
    >
      <span className="uppercase font-semibold">Customer Details</span>
      <hr className="border-b-[1px] border-primary" />
      <div className="capitalize flex flex-row items-center gap-x-4 py-1">
        <ImageWithFallback
          src={image}
          height={30}
          width={30}
          className="w-10 h-10 rounded-full object-cover"
          alt="customer"
        />
        <span className="font-medium"> {name}</span>
      </div>
      <hr className="border-b-[1px] border-primary" />
      <div className="flex flex-row items-center gap-x-3 p-2">
        <EmailIcon />
        <span className="font-normal text-base">{email}</span>
      </div>
      <hr className="border-b-[1px] border-primary" />
      <span className="font-semibold uppercase">Shipping Address</span>
      <span className="text-sm text-gray-400"> {address} </span>
    </div>
  );
}

export default CustomerCard;
