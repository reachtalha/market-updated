import React from "react";
import Link from "next/link";
import { AuthProvider } from "@/hooks/useAuth";

import { Cross1Icon } from "@radix-ui/react-icons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="grid place-content-center h-screen w-full">
        <Link
          className="absolute rounded-full hover:bg-gray-50 top-3 right-3 p-1.5"
          href="/"
        >
          <Cross1Icon className="w-5 h-5" />
        </Link>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </>
  );
};

export default Layout;
