import Logo from '@/assets/icons/system/Logo';

const NewChat = () => {
  return (
    <>
      <div className="absolute flex flex-col items-center top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 transform-gpu">
        <span className="text-5xl font-medium font-alpina italic ">
          All Organics <span className="text-xs align-bottom">&reg;</span>
        </span>

        <p className="text-center text-gray-500 mt-2">Connecting Buyers and Sellers</p>
      </div>
    </>
  );
};

export default NewChat;
