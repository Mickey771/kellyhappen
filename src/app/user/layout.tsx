"use client";
import UserSidebar from "@/components/layout/UserSidebar";
import { useAppSelector } from "@/store/store";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector((store) => store.auth);

  if (!isAuthenticated) {
    return redirect("/login");
  }

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
