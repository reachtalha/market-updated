import Logo from '@/assets/icons/system/Logo';

const NewChat = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-56 -translate-x-1/2 -translate-y-1/2 transform-gpu">
        <Logo className="text-killarney-500" />
        <p className="text-center text-gray-500 mt-2">Connecting Buyers and Sellers</p>
      </div>
    </>
  );
};

export default NewChat;
