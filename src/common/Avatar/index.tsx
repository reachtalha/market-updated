import Image from "next/image";
import Avvvatars from "avvvatars-react";

interface Props {
  name?: string | null;
  photoURL?: string | null;
}
const Avatar = ({ name, photoURL }: Props) => {
  return (
    <>
      {photoURL ? (
        <Image
          width={40}
          height={40}
          src={photoURL}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <button>
          <Avvvatars size={40} value={name!} />
        </button>
      )}
    </>
  );
};

export default Avatar;
