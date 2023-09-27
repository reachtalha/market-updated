import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Seller/Shared/Title';
import { Pencil } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { ImageIcon } from '@radix-ui/react-icons';
import Image from '@/components/common/FallbackImage';
import ImageReader from '@/utils/handlers/image/ImageReader';

type Props = {
  loading: boolean;
  isPasswordUpdate: boolean;
  setIsPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  dictionary: any;
};

const EditAccount = ({ loading, isPasswordUpdate, setIsPasswordUpdate, dictionary }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<string>();

  const {
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useFormContext();

  const handleUpdate = () => {
    if (isEdit) {
      //edit information
    } else {
      //this state is from parent component
      //so this was causing some sync issues
      setTimeout(() => {
        setIsPasswordUpdate(true);
      }, 200);
    }
  };

  const handleImageChange = ImageReader({ setImage, size: 5 });
  const handleCancel = () => {
    if (isPasswordUpdate) {
      setIsPasswordUpdate(false);
    } else {
      setIsEdit(false);
    }
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <Title title={isPasswordUpdate ? 'Update Password' : 'Profile Settings'} />
        {!isEdit && !isPasswordUpdate && (
          <div
            onClick={() => setIsEdit(true)}
            className="flex gap-x-2 flex-row items-center cursor-pointer "
          >
            <span className="text-sm sm:text-base">{dictionary.editBtnLabel}</span>
            <Pencil size={window.innerWidth < 468 ? 12 : 15} />
          </div>
        )}
      </div>

      <div className={`mt-3 w-full ${isPasswordUpdate && ' hidden'} `}>
        <div className="w-fit mx-auto">
          <Label
            htmlFor="o-image"
            className="relative rounded-full text-base cursor-pointer overflow-hidden h-32 w-32 gap-y-2 border-0 flex flex-col items-center justify-center border-neutral-500 "
          >
            {getValues('photoURL') || image ? (
              <>
                <div className="opacity-0 transition-opacity z-10 h-full w-full flex items-center justify-center duration-300 hover:opacity-100">
                  <ImageIcon className={`w-8 h-8  text-neutral-500 ${!isEdit && 'hidden'} `} />
                </div>
                <Image
                  src={image || getValues('photoURL')}
                  fill
                  alt="image"
                  className="object-cover "
                />
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-neutral-500" />
                <p className={getValues('photoURL') ? 'hidden' : ' text-sm text-center block m-0'}>
                  {dictionary.addProfileLabel}
                </p>
              </>
            )}
            <input
              disabled={!isEdit}
              type="file"
              id="o-image"
              hidden
              onChange={handleImageChange}
            />
            {image && (setValue('photoURL', image) as any)}
          </Label>
        </div>
      </div>

      <div className={` ${isPasswordUpdate && ' hidden'} `}>
        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.name.label}</Label>
          <Input
            className="w-full placeholder:text-sm capitalize"
            type="text"
            placeholder={dictionary.name.placeholder}
            {...register('name')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">{dictionary.name.error}</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.email.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.email.placeholder}
            type="email"
            {...register('email')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">{dictionary.email.error}</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.phone.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.phone.placeholder}
            type="text"
            {...register('phone')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">{dictionary.phone.error}</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.address.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.address.placeholder}
            type="text"
            {...register('address')}
            disabled={!isEdit}
          />

          {errors.name && <span className="text-sm text-red-500">{dictionary.address.error}</span>}
        </div>
      </div>

      <div className={` ${!isPasswordUpdate && ' hidden'} `}>
        <div className="space-y-1 w-full mt-3">
          <Label className=" font-medium text-sm md:text-base  text-gray-600">
            <Label>{dictionary.currentPassword.label}</Label>
          </Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.currentPassword.placeholder}
            type="password"
            {...register('currentPassword')}
          />

          {errors.name && (
            <span className="text-sm text-red-500">{dictionary.currentPassword.error}</span>
          )}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.newPassword.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.newPassword.placeholder} 
            type="password"
            {...register('newPassword')}
          />

          {errors.name && (
            <span className="text-sm text-red-500">{dictionary.newPassword.error}</span>
          )}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label>{dictionary.confirmPassword.label}</Label>
          <Input
            className="w-full placeholder:text-sm"
            placeholder={dictionary.confirmPassword.placeholder}
            type="password"
            {...register('confirmPassword')}
          />
        </div>
      </div>

      <div className="flex gap-x-2 mt-4">
        {(isEdit || isPasswordUpdate) && (
          <Button onClick={handleCancel} type="button" variant="outline" className="w-full">
            {dictionary.cancelBtnLabel}
          </Button>
        )}

        <Button
          type={isEdit ? 'submit' : isPasswordUpdate ? 'submit' : 'button'}
          onClick={handleUpdate}
          variant="default"
          className="w-full"
          disabled={loading}
        >
          {dictionary.updateBtnLabel}{' '}
          {isEdit ? dictionary.updateProfileLabel : dictionary.updatePasswordLabel}
        </Button>
      </div>
    </div>
  );
};

export default EditAccount;
