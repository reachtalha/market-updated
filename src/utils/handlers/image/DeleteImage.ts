import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase/client';

interface DeleteImageProps {
  imageUrl: string;
}

const DeleteImage = async ({ imageUrl }: DeleteImageProps) => {
  const pathStart = imageUrl.indexOf('/o/') + 3; // Find the start of the path
  const pathEnd = imageUrl.indexOf('?'); // Find the end of the path
  let imagePath = imageUrl.substring(pathStart, pathEnd);
  imagePath = imagePath.replace(/%2F/g, '/');

  imagePath = imagePath.replace(/%20/g, ' ');
  const imageRef = ref(storage, imagePath);

  await deleteObject(imageRef);
};

export default DeleteImage;
