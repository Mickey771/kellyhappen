"use client";
import UserSidebar from "@/components/Layout/UserSidebar";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex-col md:flex-row flex">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className=" overflow-y-auto flex-1 bg-[#F3F4F6]">{children}</main>
    </div>
  );
};

export default UserLayout;
