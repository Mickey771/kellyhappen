"use client";
import NotificationIcon from "@/assets/NotificationIcon";
import { ChevronDown, ChevronDownCircle, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { adminBottomLinks, adminSidebar } from "./AdminSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
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
        onClick={() => setShowSidebar(false)}
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
    <>
      <header className="bg-white shadow-sm h-18 px-6 flex items-center p-4">
        <section className="w-full flex items-center justify-between ">
          <div className="flex w-full items-center gap-6">
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu />
            </div>
            <div className="flex items-center gap-2 rounded-2xl p-2 px-4 border-[#D5D5D5] bg-[#F5F6FA] text-sm text-[#202224] border-[0.5px] w-full max-w-sm">
              <label htmlFor="search">
                <GoSearch size={16} />
              </label>
              <input
                type="text"
                placeholder="Search"
                className="bg-none outline-none w-full"
              />
            </div>
          </div>

          <div className="w-full justify-end flex items-center gap-5">
            {/* <NotificationIcon /> */}
            {/* <div className="flex items-center gap-4">
              <div className="rounded-full w-10 h-7">
                <Image
                  alt="avatar"
                  src="/icons/flag.svg"
                  width={50}
                  height={50}
                  className="size-full "
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="hidden md:block text-sm text-[#646464] font-semibold">
                  English
                </h3>
              </div>
              <ChevronDown size={16} />
            </div> */}
            <div className="flex items-center gap-3">
              <div className="rounded-full size-12">
                <Image
                  alt="avatar"
                  src="/images/avatar1.svg"
                  width={50}
                  height={50}
                  className="size-full rounded-full"
                />
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <h3 className="text-sm text-[#404040] font-bold">Moni Roy</h3>
                <p className="text-xs text-[#565656] font-semibold">Admin</p>
              </div>
              <ChevronDownCircle size={16} />
            </div>
          </div>
        </section>
      </header>
      {showSidebar && (
        <>
          <div
            className="bg-white/10 fixed inset-0 z-50 "
            onClick={() => setShowSidebar(false)}
          ></div>

          <aside className="md:hidden text-left flex flex-col pb-14 justify-between bg-white fixed left-0 h-screen overflow-y-auto w-74 z-9999">
            <section className="flex flex-col h-full justify-between">
              <article>
                <div className="w-full px-4 h-[95px] ">
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
        </>
      )}
    </>
  );
};

export default Header;
