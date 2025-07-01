import AdminSidebar from "@/components/layout/AdminSidebar";
import Header from "@/components/layout/Header";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen bg-[#F3F4F6]">
        <Header />
        <div className="overflow-y-auto scrollbar-hide ">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
