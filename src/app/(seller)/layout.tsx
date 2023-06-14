import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-secondary">{children}</div>;
};

export default Layout;
