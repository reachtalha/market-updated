import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase/client';

interface UploadImageProps {
  collection: string;
  image: any;
  name?: string;
}



const UploadImage = async ({ collection, image, name }: UploadImageProps) => {
  const fileType = image.split(';')[0].split('/')[1];
  const imgData = new (Buffer.from as any)(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const storageRef = ref(storage, `${collection}/image-${name}.${fileType}`);
  const snapshot = await uploadBytes(storageRef, imgData);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export default UploadImage;
