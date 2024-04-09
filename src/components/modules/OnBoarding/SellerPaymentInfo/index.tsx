// 'use client';
// import { useState, useEffect } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db, auth } from '@/lib/firebase/client';
// import { useRouter } from 'next/router'; // Update import to useRouter

export default function SellerPaymentInfo({ searchParams }: any) {
  // const router = useRouter();

  // const [users, setUsers] = useState<any[]>([]);

  // const getUsers = async (): Promise<any> => {
  //   const docRef = await getDocs(
  //     query(collection(db, 'users'), where('id', '==', searchParams.id))
  //   );
  //   return docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await getUsers();
  //     setUsers(fetchedUsers);
  //   };

  //   fetchUsers();
  // }, []);

  // console.log(users);

  return (
    <div>
      {searchParams.id}
      {/* <button type="button" onClick={handleCreateAccount}>
        Connect with Stripe
      </button> */}
    </div>
  );
}
