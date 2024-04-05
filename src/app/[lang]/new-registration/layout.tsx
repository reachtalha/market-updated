import { ReactNode } from 'react';
import Link from 'next/link';
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="grid overflow-hidden lg:grid-cols-2">
        <div className="py-12 overflow-y-scroll">{children}</div>
        <div className="h-screen bg-primary text-white grid place-content-center">
          <Link href="/" className=" font-alpina text-5xl italic">
            All Organics <span className="text-xs align-bottom">&reg;</span>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Layout;
