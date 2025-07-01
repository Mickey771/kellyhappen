"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Power, Settings } from "lucide-react";
import DashboardIcon from "@/assets/DashboardIcon";
import DashboardIcon2 from "@/assets/DashboardIcon2";
import { AiOutlineProduct } from "react-icons/ai";

export const adminSidebar = [
  {
    activeIcon: <DashboardIcon />,
    icon: <DashboardIcon2 />,
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    activeIcon: <Info />,
    icon: <Info />,
    name: "Inbox",
    href: "/admin/inbox",
  },
  {
    activeIcon: (
      <div>
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm-11-5h4.376a4.007 4.007 0 0 0 1.067 3.85l.162.151L9.25 14a2.75 2.75 0 0 0-2.649 2.008l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.756 2.756 0 0 0-2.451-2L14.75 14l-.105.001a3.99 3.99 0 0 0 1.229-4L20.25 10ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    icon: (
      <div>
        <svg
          width="24"
          height="24"
          fill="#33333399"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm-11-5h4.376a4.007 4.007 0 0 0 1.067 3.85l.162.151L9.25 14a2.75 2.75 0 0 0-2.649 2.008l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.756 2.756 0 0 0-2.451-2L14.75 14l-.105.001a3.99 3.99 0 0 0 1.229-4L20.25 10ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
            fill="#33333399"
          />
        </svg>
      </div>
    ),
    name: "Members List",
    href: "/admin/members",
  },
  {
    activeIcon: <AiOutlineProduct size={20} />,
    icon: <AiOutlineProduct size={20} />,
    name: "Products List",
    href: "/admin/products",
  },
];

export const adminBottomLinks = [
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings />,
  },
  {
    name: "Logout",
    href: "/admin/logout",
    icon: <Power />,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  const renderLink = (
    href: string,
    name: string,
    icon: React.ReactNode,
    activeIcon?: React.ReactNode
  ) => {
    const isActive = pathname === href;

    return (
      <Link
        key={name}
        href={href}
        className="flex gap-4 w-full rounded-md text-sm font-medium transition h-13"
      >
        <div
          className={`${
            isActive ? "bg-[#A69F93]" : "bg-white"
          } w-2 h-12 rounded-r-md`}
        />
        <div
          className={`flex w-full px-4 items-center gap-3 h-12 rounded-md text-sm font-medium transition ${
            isActive
              ? "bg-[#A69F93] text-white"
              : "text-[#A69F93] hover:bg-[#A69F9325]"
          }`}
        >
          {isActive && activeIcon ? activeIcon : icon}
          {name}
        </div>
      </Link>
    );
  };

  return (
    <aside className="md:w-50 lg:w-64 hidden md:block bg-white border-r border-gray-200">
      <section className="flex flex-col h-full justify-between">
        <article>
          <div className="w-full px-4 h-[95px]">
            <Image
              width={0}
              height={0}
              alt="logo"
              src="/images/dashboardlogo.svg"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <section className="mt-7 flex flex-col gap-2 pr-4">
            {adminSidebar.map(({ href, name, icon, activeIcon }) =>
              renderLink(href, name, icon, activeIcon)
            )}
          </section>
        </article>

        <article className="pr-4">
          {adminBottomLinks.map(({ name, href, icon }) =>
            renderLink(href, name, icon)
          )}
        </article>
      </section>
    </aside>
  );
};

export default AdminSidebar;
