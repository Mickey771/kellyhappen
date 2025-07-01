"use client";

import { useState } from "react";
import {
  CircleCheck,
  CircleEllipsis,
  Wallet,
  Copy,
  User,
  MapPin,
  Phone,
  Currency,
  ArrowRight,
  Lock,
} from "lucide-react";
import HeroSlider from "@/components/user/HeroSlider";
import { CiUser } from "react-icons/ci";
import BitcoinIcon from "@/assets/BitcoinIcon";

const WalletInfo = () => {
  return (
    <form className="max-w-md space-y-3">
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <CiUser size={24} />
          Full Name
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>

      {/* wallet address  */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <MapPin size={24} />
          Wallet Address
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>
      {/* phonebook  */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Phone size={24} />
          Phone Number
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>
      {/* network  */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Network
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>
      <button className="block w-full text-center py-4  text-xl rounded-[40px] px-6 bg-black text-white hover:opacity-80 cursor-pointer">
        Submit
      </button>
    </form>
  );
};
const Withdraw = () => {
  return (
    <form className="space-y-3 max-w-md">
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Wallet Address
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>

      {/* wallet address  */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Network
        </label>
        <input
          type="text"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>
      {/* phonebook  */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Lock size={24} />
          Pin
        </label>
        <input
          type="password"
          className="w-full border border-[#33333399] shadow bg-white  outline-none rounded-[32px] p-3"
        />
      </div>
      {/* network  */}

      <button className="block w-full text-center py-4  text-xl rounded-[40px] px-6 bg-black text-white hover:opacity-80 cursor-pointer">
        Submit
      </button>
    </form>
  );
};

const filterBtns = [
  { title: "Wallet Info", icon: <CircleEllipsis /> },
  { title: "Withdraw", icon: <CircleCheck /> },
];
const components = [<WalletInfo />, <Withdraw />];
const page = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <section className="p-7">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">Wallet</h2>
      {/* filter with completed and pending */}
      <section className="flex flex-col md:flex-row gap-5">
        <article className="w-full md:max-w-[280px] p-4 flex flex-col justify-between h-[152px] rounded-[20px] bg-[#A69F93]">
          <div className="flex justify-between md:flex-row flex-row-reverse items-center gap-4">
            <Wallet size={24} color="white" />
            <p className="text-base font-semibold text-white">
              Available Balance
            </p>
          </div>
          <p className="text-[48px] leading-[130%] font-bold text-white">
            $81,000
          </p>
        </article>
        <article className="w-full md:max-w-[280px] h-[152px] p-4 flex flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
          <div className="flex justify-between md:flex-row flex-row-reverse items-center gap-4">
            <p className="text-base font-semibold ">Wallet Link</p>
            <ArrowRight size={24} />
          </div>
          <div className="flex items-center gap-1 w-50">
            <BitcoinIcon />
            <span className="text-xs text-[#737373] w-full">
              6534A******DJ65N6876547GcgHGscvkHChgsgjahbch***
            </span>
          </div>
          <Copy />
        </article>
      </section>

      <article className="mt-6 mb-9 flex gap-7 items-center justify-between">
        <div className="flex gap-7 items-center">
          {filterBtns.map((btn, i) => (
            <div
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`${
                i == activeFilter
                  ? "bg-[#171717] text-white"
                  : "border border-[#8888884D] text-[#888888]"
              }
              flex items-center cursor-pointer justify-center gap-4 rounded-[10px] py-2 px-7`}
            >
              {btn.icon}
              <p>{btn.title}</p>
            </div>
          ))}
        </div>
      </article>
      {components[activeFilter]}
      <div className="mt-10">
        <HeroSlider />
      </div>
    </section>
  );
};

export default page;
