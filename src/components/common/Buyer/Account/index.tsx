'use client';

import { useRole } from '@/hooks/useUserRole';
import useCategorySlug from '@/hooks/useCategorySlug';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import Loader from '@/components/common/Loader';
import AccountOption, { Option } from '@/components/common/Buyer/Account/AccountOptions';
import BoxedContent from '@/components/common/BoxedContent';
import Settings from '@/components/modules/Account/Settings';
import OrderHistory from '@/components/modules/Account/OrderHistory';
import Socials from '@/components/modules/Account/Socials';
import Wishlist from '@/components/modules/Account/Wishlist';
import ManageBlogs from '@/components/modules/Blogs/ManageBlogs';
import { AccountsLoader } from '@/components/common/Skeleton/SkeletonLoader';

type AccountProps = {
  options: Option[];
};

function Index({ options }: AccountProps) {
  const category = useCategorySlug();
  const role = useRole();
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <AccountsLoader />;
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
      case 'order':
        return <OrderHistory />;
      case 'blogs':
        return <ManageBlogs />;
      case 'wishlist':
        return (
          <>
            {user ? (
              <div className=" w-full ">
                <Wishlist />
              </div>
            ) : (
              <div className="h-[50vh] w-full flex items-center justify-center">
                <Loader />
              </div>
            )}
          </>
        );
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
                },
                {
                  name: 'Manage Blogs',
                  slug: 'blogs',
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
