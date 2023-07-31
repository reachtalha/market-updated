import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface ImageHandlerProps {
  setImage: Dispatch<SetStateAction<string | undefined>>;
  size: number;
}

const ImageReader =
  ({ setImage, size = 5 }: ImageHandlerProps) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.match(/\.(jpg|jpeg|png|webp)$/)) {
      toast.error('Please select a valid image');
      return;
    }
    if (file.size > size * 1024 * 1024) {
      toast.error(`Please select an image smaller than ${size}MB`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.onerror = () => {
      toast.error('Error while reading the image');
    };
  };

export default ImageReader;
