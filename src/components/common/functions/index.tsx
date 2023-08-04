import { storage } from '@/lib/firebase/client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
export const formatCurrency = (value: number, locale: string = 'en-GB'): string => {
  // Use a constant for the currency code
  const CURRENCY_CODE = 'USD';
  // Use the currency code as an argument for the Intl.NumberFormat constructor
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: CURRENCY_CODE
  }).format(value);
};

export const formatDateAndTime = (date: Date, locale: string = 'en-GB'): string => {
  // Use the Intl.DateTimeFormat constructor with options for the date and time format
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

export const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  isMultiple: boolean = false
): Promise<string | string[] | null> => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const files = e.target.files || []; // Store the files in a variable
  const fileCount = files?.length; // Store the file count in a variable
  const imageDataArray = await Promise.all(
    Array.from(files).map((file) => {
      const fileName = file.name; // Store the file name in a variable
      if (!fileName.match(/\.(jpg|jpeg|png|webp)$/)) {
        throw new Error('Please select a valid image');
      }
      // Check if the file size is within the limit
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('Please select an image less than 10MB');
      }
      // Create a file reader and return a promise that resolves with the data URL
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsDataURL(file);
      });
    })
  );
  // Return the first element or null if the array is empty and isMultiple is false
  return isMultiple ? imageDataArray : imageDataArray[0] ?? null;
};

export function getPathStorageFromUrl(url: string) {
  const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/market-25d08.appspot.com/o/';

  let imagePath: string = url.replace(baseUrl, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);

  imagePath = imagePath.replace(/%2F/g, '/');

  imagePath = imagePath.replace(/%20/g, ' ');

  return imagePath;
}

export function calSubTotal(products: any) {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].quantity * products[i].price;
  }
  return sum;
}

export function extractImageInfo(url: any) {
  const regex = /%2F(.*?)\?alt=media&token=/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export const valueFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

export function formatDate(date: any, locale = 'en-US') {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}

export const handleImage = (file: any, setImage: any) => {
  if (!file.name.match(/\.(jpg|jpeg|png|webp)$/)) {
    throw new Error('Please select a valid image file (jpg, jpeg, png, webp).');
  }
  if (file.size > 10485760) {
    throw new Error('Please select an image file less than 10MB in size.');
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.onerror = () => {
    throw new Error('Unable to read Image!');
  };
};

export const handleImages = (e: any, limit: number = 4, list: any, setList: any) => {
  if (list.length > limit - 1) {
    throw new Error('You can only upload 4 pictures');
  }
  for (const file of e.target.files) {
    if (!file.name.match(/\.(jpg|jpeg|png|webp)$/)) {
      throw new Error('Please select valid image');
    }
    if (file.size > 10485760) {
      throw new Error('Please select image less than 10MB');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setList((imgs: any) => [...imgs, reader.result]);
    };
    reader.onerror = () => {
      throw new Error('Unable to read Image!');
    };
  }
};

export const deleteImage = (file: any, setList: any) => {
  setList((imgs: any) => imgs.filter((img: any) => img !== file));
};
