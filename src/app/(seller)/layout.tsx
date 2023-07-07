import React from "react";

import Sidebar from "@/common/Seller/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-neutral-900 p-1.5 flex gap-1.5 h-screen overflow-hidden">
      <aside>
        <Sidebar />
      </aside>
      <section className="bg-neutral-50 text-neutral-900 rounded-xl flex-1">
        {children}
      </section>
    </main>
  );
};

export default Layout;
