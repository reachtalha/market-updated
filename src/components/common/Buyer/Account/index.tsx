'use client';
import React, { useEffect, useState } from 'react';
import AccountOption, { Option } from '@/components/common/Buyer/Account/AccountOptions';
import BoxedContent from '@/components/common/BoxedContent';
import useCategorySlug from '@/hooks/useCategorySlug';
import Settings from '@/components/modules/Account/Settings';
import CardInfo from '@/components/modules/Account/CardInfo';
import OrderHistory from '@/components/modules/Account/OrderHistory';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import Loader from '../../Loader';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useUserRole';

type AccountProps = {
  options: Option[];
};

function Index({ options }: AccountProps) {
  const category = useCategorySlug();
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const role = useRole();

  if (!auth.currentUser) {
    router.push('/auth/login');
  }

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, 'users', auth.currentUser?.uid || '');
      const docSnap = await getDoc(docRef);

      return docSnap.data();
    };

    getUser()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  const renderComponent = () => {
    switch (category) {
      case 'settings':
        return (
          <>
            {user ? (
              <div className=" w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-auto">
                <Settings
                  defaultValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    newPassword: '',
                    currentPassword: '',
                    confirmPassword: ''
                  }}
                />
              </div>
            ) : (
              <div className="h-[50vh] w-full flex items-center justify-center">
                <Loader />
              </div>
            )}
          </>
        );
      case 'card':
        return (
          <div className=" w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-auto">
            <CardInfo />
          </div>
        );
      case 'order':
        return <OrderHistory />;
      default:
        return (
          <>
            {user ? (
              <div className=" w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-auto">
                <Settings
                  defaultValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    newPassword: '',
                    currentPassword: '',
                    confirmPassword: ''
                  }}
                />
              </div>
            ) : (
              <div className="h-[50vh] w-full flex items-center justify-center">
                <Loader />
              </div>
            )}
          </>
        );
    }
  };
  return (
    <BoxedContent className="flex flex-col sm:flex-row  border-3 gap-x-5 py-20">
      <AccountOption
        selectedOption={category}
        options={
          role === 'influencer'
            ? [
                ...options,
                {
                  name: 'Socials',
                  slug: 'Socials',
                  href: '/account?socials'
                }
              ]
            : options
        }
      />
      {renderComponent()}
    </BoxedContent>
  );
}

export default Index;
