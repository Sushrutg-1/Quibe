import Navbar from "@/components/Navbar";
import React from "react";

function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default UserLayout;
