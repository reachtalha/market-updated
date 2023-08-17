import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Seller/Shared/Title';
import { Pencil } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

type Props = {
  isPasswordUpdate: boolean;
  setIsPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditAccount = ({ isPasswordUpdate, setIsPasswordUpdate }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    register,
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
            <span className="text-sm sm:text-base">Edit</span>
            <Pencil size={window.innerWidth < 468 ? 12 : 15} />
          </div>
        )}
      </div>

      <div className={` ${isPasswordUpdate && ' hidden'} `}>
        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">Name</Label>
          <Input
            className="w-full placeholder:text-sm capitalize"
            type="text"
            {...register('name')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">Name doesn`t look valid</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">Email</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="email"
            {...register('email')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">Email doesn`t look valid</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">Phone</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            {...register('phone')}
            disabled={!isEdit}
          />
          {errors.name && <span className="text-sm text-red-500">phone doesn`t look valid</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">Address</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="text"
            {...register('address')}
            disabled={!isEdit}
          />

          {errors.name && <span className="text-sm text-red-500">Address doesn`t look valid</span>}
        </div>
      </div>

      <div className={` ${!isPasswordUpdate && ' hidden'} `}>
        <div className="space-y-1 w-full mt-3">
          <Label className=" font-medium text-sm md:text-base  text-gray-600">
            Current Password
          </Label>
          <Input
            className="w-full placeholder:text-sm"
            type="password"
            {...register('currentPassword')}
            placeholder="Enter Current Password"
          />

          {errors.name && <span className="text-sm text-red-500">Password doesn`t look valid</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">New Password</Label>
          <Input
            className="w-full placeholder:text-sm"
            type="password"
            {...register('newPassword')}
            placeholder="Enter New Password"
          />

          {errors.name && <span className="text-sm text-red-500">Password doesn`t look valid</span>}
        </div>

        <div className="space-y-1 w-full mt-3">
          <Label className="text-sm md:text-base">
            Confirm Password
          </Label>
          <Input
            className="w-full placeholder:text-sm"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="flex gap-x-2 mt-4">
        {(isEdit || isPasswordUpdate) && (
          <Button
            onClick={handleCancel}
            type="button"
            variant="outline"
            className="w-full"
          >
            Cancel
          </Button>
        )}

        <Button
          type={isEdit ? 'submit' : isPasswordUpdate ? 'submit' : 'button'}
          onClick={handleUpdate}
          variant="default"
          className="w-full"
        >
          Update {isEdit ? 'Profile' : 'Password'}
        </Button>
      </div>
    </div>
  );
};

export default EditAccount;
