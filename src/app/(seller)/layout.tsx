"use client";
import React from "react";
import Sidebar from "@/components/common/Seller/Sidebar";
import MobileNavbar from "@/components/common/Seller/Navbar/MobileNavbar";
import useGlobalStore from "@/state";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showSidebar, isMobile } = useGlobalStore() as any;

  return (
    <div
      className={`bg-neutral-900 flex  h-screen overflow-hidden  ${
        !isMobile && " p-1.5 gap-1.5"
      } `}
    >
      {/*> */}
      <aside>
        <Sidebar />
      </aside>
      <section
        className={`bg-neutral-50  transition-all  duration-1000 overflow-scroll no-scrollbar   text-neutral-900  flex-1 ${
          !isMobile && "rounded-xl"
        } ${isMobile && showSidebar && "tilted-div"}`}
      >
        {isMobile && <MobileNavbar />}

        {children}
      </section>
    </div>
  );
};

export default Layout;
