'use client';

import { useRole } from '@/hooks/useUserRole';
import useCategorySlug from '@/hooks/useCategorySlug';

import useSWR from 'swr';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

import AccountOption, { Option } from '@/components/common/Buyer/Account/AccountOptions';
import BoxedContent from '@/components/common/BoxedContent';
import Settings from '@/components/modules/Account/Settings';
import CardInfo from '@/components/modules/Account/CardInfo';
import OrderHistory from '@/components/modules/Account/OrderHistory';
import Socials from '@/components/modules/Account/Socials';

type AccountProps = {
  options: Option[];
};

function Index({ options }: AccountProps) {
  const category = useCategorySlug();
  const role = useRole();

  const { data: user, isLoading, error } = useSWR("currentUser", async () => {
    const docRef = doc(db, 'users', `${auth.currentUser?.uid}`);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as any;
  })

  if (isLoading) {
    return <Loader className="grid place-content-center h-full w-full" />
  }

  if (error) {
    return <Error className="grid place-content-center h-full w-full" />
  }

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
      case 'socials':
        return (
          <>
            {user ? (
              <div className=" w-full sm:w-4/5 md:w-3/5 lg:w-2/5 m-auto">
                <Socials
                  defaultValues={{
                    bio: user.bio,
                    socialMediaLinks: user.socialMediaLinks || [],
                    topics: user.topics || []
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
                slug: 'socials',
                href: '/account?display'
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
