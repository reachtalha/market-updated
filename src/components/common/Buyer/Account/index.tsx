"use client";
import React, { useEffect, useState } from "react";
import AccountOption, {
  Option,
} from "@/components/common/Buyer/Account/AccountOptions";
import BoxedContent from "@/components/common/BoxedContent";
import useCategorySlug from "@/hooks/useCategorySlug";
import Settings from "@/components/modules/Account/Settings";
import CardInfo from "@/components/modules/Account/CardInfo";
import OrderHistory from "@/components/modules/Account/OrderHistory";
import { getDoc, collection, doc, where, query } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/client";
import Loader from "../../Loader";

type AccountProps = {
  options: Option[];
};

function Index({ options }: AccountProps) {
  const category = useCategorySlug();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", auth.currentUser?.uid || "");
      const docSnap = await getDoc(docRef);

      return docSnap.data();
    };

    getUser()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  const renderComponent = () => {
    switch (category) {
      case "settings":
        return (
          <>
            {user ? (
              <div className=' w-2/5 m-auto'>
                <Settings
                  defaultValues={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    newPassword: "",
                    currentPassword: "",
                    confirmPassword: "",
                  }}
                />
              </div>
            ) : (
              <div className='h-[50vh] w-full flex items-center justify-center'>
                <Loader />
              </div>
            )}
          </>
        );
      case "card":
        return (
          <div className=' w-2/5 m-auto'>
            <CardInfo />
          </div>
        );
      case "order":
        return <OrderHistory />;
      default:
        return <div>Settings</div>;
    }
  };
  return (
    <BoxedContent className='flex gap-x-5 py-20'>
      <AccountOption selectedOption={category} options={options} />
      {renderComponent()}
    </BoxedContent>
  );
}

export default Index;
