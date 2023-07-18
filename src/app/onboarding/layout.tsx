"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import Loader from "@/components/common/Loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!auth.currentUser) {
    router.back();
    return (
      <Loader className="grid place-content-center h-screen w-screen overflow-hidden" />
    );
  }
  return (
    <>
      <main className="grid place-content-center min-h-screen w-full">
        {children}
      </main>
    </>
  );
};

export default Layout;
