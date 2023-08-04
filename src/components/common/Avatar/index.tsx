import Image from 'next/image';
import Avvvatars from 'avvvatars-react';

interface Props {
  name?: string | null;
  photoURL?: string | null;
}
const Avatar = ({ name, photoURL }: Props) => {
  return (
    <>
      {photoURL ? (
        <div className="p-0.5 border-2 border-neutral-300 rounded-full overflow-hidden">
          <Image
            width={40}
            height={40}
            src={photoURL}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      ) : (
        <button>
          <Avvvatars size={40} value={name!} />
        </button>
      )}
    </>
  );
};

export default Avatar;
