// components/wallet/WalletPage.tsx
"use client";

import { useState, useEffect } from "react";
import {
  CircleCheck,
  CircleEllipsis,
  Wallet,
  Copy,
  User,
  ArrowRight,
} from "lucide-react";
import HeroSlider from "@/components/user/HeroSlider";
import BitcoinIcon from "@/assets/BitcoinIcon";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile, clearError } from "@/store/reducers/userSlice";
import { WalletInfo } from "./components/WalletInfo";
import { Deposit } from "./components/Deposit";
import { Withdrawal } from "./components/Withdrawal";
import { Requests } from "./components/Requests";

const filterBtns = [
  { title: "Wallet Info", icon: <CircleEllipsis /> },
  { title: "Deposit", icon: <ArrowRight /> },
  { title: "Withdraw", icon: <CircleCheck /> },
  { title: "Requests", icon: <User /> },
];

const WalletPage = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const maskWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}******${address.slice(-6)}`;
  };

  const components = [
    <WalletInfo key="wallet" />,
    <Deposit key="deposit" />,
    <Withdrawal key="withdraw" />,
    <Requests key="requests" />,
  ];

  return (
    <section className="p-7">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">Wallet</h2>

      <section className="flex flex-col md:flex-row gap-5">
        <article className="w-full md:max-w-[280px] p-4 flex flex-col justify-between h-[152px] rounded-[20px] bg-[#A69F93]">
          <div className="flex justify-between md:flex-row flex-row-reverse items-center gap-4">
            <Wallet size={24} color="white" />
            <p className="text-base font-semibold text-white">
              Available Balance
            </p>
          </div>
          <p className="text-[48px] leading-[130%] font-bold text-white">
            ${profile?.balance?.toLocaleString() || "0"}
          </p>
        </article>

        <article className="w-full md:max-w-[280px] h-[152px] p-4 flex flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
          <div className="flex justify-between md:flex-row flex-row-reverse items-center gap-4">
            <p className="text-base font-semibold">Wallet Link</p>
            <ArrowRight size={24} />
          </div>
          <div className="flex items-center gap-1 w-50">
            <BitcoinIcon />
            <span className="text-xs text-[#737373] w-full">
              {profile?.walletAddress
                ? maskWalletAddress(profile.walletAddress)
                : "No wallet address"}
            </span>
          </div>
          {profile?.walletAddress && (
            <Copy
              className="cursor-pointer hover:opacity-70"
              onClick={() => copyToClipboard(profile.walletAddress || "")}
            />
          )}
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

export default WalletPage;
