"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiWallet } from "react-icons/ci";
import { AiOutlineAntDesign } from "react-icons/ai";
import { SiProgress } from "react-icons/si";
import { LuCircleUserRound } from "react-icons/lu";
import {
  House,
  ChevronUp,
  ChevronDown,
  Info,
  Menu,
  X,
  CircleUserRound,
  File,
  PanelRightOpen,
  PanelRightClose,
  Wallet,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import BeginnerIcon from "@/assets/BeginnerIcon";
import InviteIcon from "@/assets/InviteIcon";
import InviteIcon2 from "@/assets/InviteIcon2";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/reducers/authSlice";

const sidebar = [
  {
    activeIcon: <House />,
    icon: <House />,
    name: "Dashboard",
    href: "/user/dashboard",
  },
  {
    activeIcon: <AiOutlineAntDesign size={24} />,
    icon: <AiOutlineAntDesign size={24} />,
    name: "Design Data",
    value: 39,
    href: "/user/design-data",
  },
  {
    activeIcon: <SiProgress size={24} />,
    icon: <SiProgress size={24} />,
    name: "Design Progress List",
    href: "/user/design-progress",
  },
  {
    activeIcon: <CiWallet />,
    icon: <Wallet size={24} />,
    name: "Wallet",
    href: "/user/wallet",
  },
  {
    activeIcon: <InviteIcon />,
    icon: <InviteIcon2 />,
    name: "Invite Friends",
    href: "/user/invite-friends",
  },
];

const menuItems = [
  {
    activeIcon: <CircleUserRound />,
    icon: <CircleUserRound />,
    name: "Profile",
    href: "/user/profile",
  },
  {
    activeIcon: <Info />,
    icon: <Info />,
    name: "Info",
    href: "/user/info",
  },
  {
    activeIcon: <File />,
    icon: <File />,
    name: "Terms & Conditions",
    href: "/user/terms",
  },
  {
    activeIcon: (
      <div className="w-5 h-5">
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fontSize={18}
        >
          <path
            d="M2 3h22v11h-2V5H2v14h12v2H0V3h2zm8 4H6v4h4V7zm-6 6h8v4H4v-4zm16-6h-6v2h6V7zm-6 4h6v2h-6v-2zm3 4h-3v2h3v-2zm4 6v3h-2v-3h-3v-2h3v-3h2v3h3v2h-3z"
            fill="currentColor"
          />
        </svg>
      </div>
    ),
    icon: (
      <div className="w-5 h-5">
        <svg
          fill="#888888"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M2 3h22v11h-2V5H2v14h12v2H0V3h2zm8 4H6v4h4V7zm-6 6h8v4H4v-4zm16-6h-6v2h6V7zm-6 4h6v2h-6v-2zm3 4h-3v2h3v-2zm4 6v3h-2v-3h-3v-2h3v-3h2v3h3v2h-3z"
            fill="#888888"
          />
        </svg>
      </div>
    ),
    name: "Contact Us",
    href: "/user/contact-us",
  },
  {
    activeIcon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.25 2c.966 0 1.75.783 1.75 1.75v3.042a2.75 2.75 0 0 1-1.477 2.438l-6.3 3.29A5 5 0 0 1 12 22a5 5 0 0 1-2.223-9.48l-6.3-3.29A2.75 2.75 0 0 1 2 6.792V3.75C2 2.783 2.784 2 3.75 2h16.5ZM12 13.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4-10H7.997v6.398l3.887 2.03a.25.25 0 0 0 .232 0L16 9.898V3.5Z"
          fill="#ffffff"
        />
      </svg>
    ),
    icon: (
      <svg
        width="24"
        height="24"
        fill="#888888"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.25 2c.966 0 1.75.783 1.75 1.75v3.042a2.75 2.75 0 0 1-1.477 2.438l-6.3 3.29A5 5 0 0 1 12 22a5 5 0 0 1-2.223-9.48l-6.3-3.29A2.75 2.75 0 0 1 2 6.792V3.75C2 2.783 2.784 2 3.75 2h16.5ZM12 13.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4-10H7.997v6.398l3.887 2.03a.25.25 0 0 0 .232 0L16 9.898V3.5Z"
          fill="#888888"
        />
      </svg>
    ),
    name: "Membership Upgrade",
    href: "/user/membership-upgrade",
  },
  {
    activeIcon: (
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
          fill="#ffffff"
        />
      </svg>
    ),
    icon: (
      <svg
        width="24"
        height="24"
        fill="#888888"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
          fill="#888888"
        />
      </svg>
    ),
    name: "Agent",
    href: "/user/agent",
  },
];

const UserSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/login");
    } catch (error) {
      router.push("/login");
    }
  };

  return (
    <>
      <header className="md:hidden ">
        <div className="flex p-4 justify-between w-full items-center cursor-pointer">
          <div className="flex gap-3 items-center">
            <Image
              src="/images/avatar30.svg"
              alt="User"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            <div>
              <h4 className="font-bold text-[#2A2A2A]">
                {user?.username || "User"}
              </h4>
              <p className="text-sm text-[#727272]">Designer</p>
            </div>
          </div>
          <div
            className="cursor-pointer text-[28px] text-[#454545]"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <X /> : <Menu />}
          </div>
        </div>
      </header>
      {showSidebar && (
        <>
          <div
            className="bg-white/10 fixed inset-0 z-50 "
            onClick={() => setShowSidebar(false)}
          ></div>
          <aside className="md:hidden text-right flex flex-col pb-14 justify-between bg-white fixed right-0 h-screen overflow-y-auto w-74 z-9999">
            <div className="w-full px-4 h-[95px] ">
              <Image
                width={0}
                height={0}
                alt="logo"
                src="/images/k_kelly.svg"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <article className="mt-9 flex justify-end px-4 items-center gap-4">
              <BeginnerIcon />
              <div className="flex text-[#333333] gap-1 flex-col">
                <p className="font-[300]">Unlock 0.75%</p>
                <p className="font-semibold">Beginner Designer</p>
              </div>
            </article>
            <section className="mt-8  px-4">
              <h5 className="text-sm text-[#727272] leading-[150%] mb-3">
                GENERAL
              </h5>
              <div className="flex flex-col gap-1">
                {sidebar.map(({ href, name, icon, value, activeIcon }, i) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={name}
                      href={href}
                      className="w-full  rounded-md text-sm font-medium transition h-13 "
                    >
                      <div
                        onClick={() => setShowSidebar(false)}
                        className={`flex w-full px-4 items-center gap-3 h-12 rounded-md text-sm font-medium justify-end transition      ${
                          isActive
                            ? "bg-[#A69F93] text-white"
                            : "text-[#A69F93] hover:bg-[#A69F9325]"
                        }`}
                      >
                        {isActive ? activeIcon : icon}
                        <p>
                          {name}
                          {value && <span>({value})</span>}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
            {/* user profile  */}
            <section className="mt-[45px] px-4 py-2 mb-10 rounded-[12px] mx-4 border shadow-sm border-[#E7E7E7]">
              <div
                className="flex flex-row-reverse justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <div className="flex gap-3 flex-row-reverse items-center">
                  <Image
                    src="/images/avatar30.svg"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Designer</p>
                    <h4 className="font-medium text-gray-900">
                      {user?.username || "User"}
                    </h4>
                  </div>
                </div>
                {open ? <ChevronUp /> : <ChevronDown />}
              </div>

              {open && (
                <ul className="mt-4 ">
                  {menuItems.map(({ icon, name, href, activeIcon }, index) => {
                    const isActive = pathname === href;

                    return (
                      <Link
                        href={href}
                        key={index}
                        onClick={() => setShowSidebar(false)}
                        className="flex justify-end items-center rounded-l-[1px] border-[#D1D1D1]  gap-3 text-sm text-gray-600 cursor-pointer "
                      >
                        <div
                          className={`${
                            isActive
                              ? "bg-[#A69F93] text-white"
                              : "text-[#888888] hover:bg-[#A69F9325]"
                          } flex items-center w-full p-2 rounded-[12px] gap-2`}
                        >
                          {isActive ? activeIcon : icon}
                          <p className="text-sm py-[10px] leading-[150%] ">
                            {name}
                          </p>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex justify-end items-center w-full rounded-l-[1px] border-[#D1D1D1] gap-3 text-sm text-gray-600 cursor-pointer"
                  >
                    <div className="text-[#888888] hover:bg-[#A69F9325] flex items-center w-full p-2 rounded-[12px] gap-2">
                      <LogOut />
                      <p className="text-sm py-[10px] leading-[150%]">Logout</p>
                    </div>
                  </button>
                </ul>
              )}
            </section>
          </aside>
        </>
      )}

      {/* Desktop */}
      <aside
        className={`${
          sidebarOpen ? "w-full md:w-70 xl:w-80" : "w-30"
        } bg-white scrollbar-hide overflow-y-auto border-r border-gray-200 pb-10`}
      >
        <section className="hidden md:flex flex-col  justify-between">
          <article className="flex px-4 items-center gap-4">
            <div className="w-full  h-[95px] ">
              {sidebarOpen ? (
                <Image
                  width={0}
                  height={0}
                  alt="logo"
                  src="/images/dashboardlogo.svg"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Image
                  width={0}
                  height={0}
                  alt="logo"
                  src="/images/k_kelly.svg"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>

            <div
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cursor-pointer text-[#454545] w-6 h-6"
            >
              {sidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
            </div>
          </article>

          {sidebarOpen && (
            <article className="mt-9  flex px-4 items-center gap-4">
              <BeginnerIcon />
              <div className="flex text-[#333333] gap-1 flex-col">
                <p className="font-[300]">Unlock 0.75%</p>
                <p className="font-semibold">Beginner Designer</p>
              </div>
            </article>
          )}
          <section className="mt-8  px-4">
            <h5 className="text-sm text-[#727272] leading-[150%] mb-3">
              GENERAL
            </h5>
            <div className="flex flex-col gap-1">
              {sidebar.map(({ href, name, icon, value, activeIcon }, i) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    className="w-full  rounded-md text-sm font-medium transition h-13 "
                  >
                    <div
                      className={`flex w-full px-4 items-center gap-3 h-12 rounded-md text-sm font-medium transition      ${
                        isActive
                          ? "bg-[#A69F93] text-white"
                          : "text-[#A69F93] hover:bg-[#A69F9325]"
                      }`}
                    >
                      {isActive ? activeIcon : icon}
                      {sidebarOpen && (
                        <p>
                          {name}
                          {value && <span>({value})</span>}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* User Profile */}
          <section className="mt-[45px] px-4 py-2 rounded-[12px] mx-4 border shadow-sm border-[#E7E7E7]">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div className="flex gap-3 items-center">
                <Image
                  src="/images/avatar30.svg"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                {sidebarOpen && (
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {user?.username || "User"}
                    </h4>
                    <p className="text-sm text-gray-500">Designer</p>
                  </div>
                )}
              </div>
              {open ? <ChevronUp /> : <ChevronDown />}
            </div>

            {open && (
              <ul className="mt-4 ">
                {menuItems.map(({ icon, name, activeIcon, href }, index) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      href={href}
                      key={index}
                      className={`${
                        sidebarOpen ? "border-l" : "border-none"
                      } flex  items-center rounded-l-[1px] border-[#D1D1D1]  gap-3 text-sm text-gray-600 cursor-pointer `}
                    >
                      {sidebarOpen && (
                        <span className="h-px w-4 bg-gray-300 block " />
                      )}

                      <div
                        className={`${
                          isActive
                            ? "bg-[#A69F93] text-white"
                            : "text-[#888888] hover:bg-[#A69F9325]"
                        } flex items-center w-full p-2 rounded-[12px] gap-2`}
                      >
                        {isActive ? activeIcon : icon}

                        {sidebarOpen && (
                          <p className="text-sm py-[10px] leading-[150%] ">
                            {name}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`${
                    sidebarOpen ? "border-l" : "border-none"
                  } flex items-center rounded-l-[1px] border-[#D1D1D1] gap-3 text-sm text-gray-600 cursor-pointer w-full`}
                >
                  {sidebarOpen && (
                    <span className="h-px w-4 bg-gray-300 block " />
                  )}

                  <div className="text-[#888888] hover:bg-[#A69F9325] flex items-center w-full p-2 rounded-[12px] gap-2">
                    <LogOut />
                    {sidebarOpen && (
                      <p className="text-sm py-[10px] leading-[150%]">Logout</p>
                    )}
                  </div>
                </button>
              </ul>
            )}
          </section>
        </section>
      </aside>
    </>
  );
};

export default UserSidebar;
