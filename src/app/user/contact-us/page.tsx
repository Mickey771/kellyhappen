import { Mail } from "lucide-react";
import { FaCaretRight } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";

import { PiTelegramLogoThin } from "react-icons/pi";
const page = () => {
  return (
    <section className="p-6">
      <article className="my-4">
        <h2 className="text-3xl font-semibold text-[#333333]">Contact Us</h2>
        <div className="flex text-sm items-center text-[#888888] gap-4">
          <span>Dashboard</span>
          <FaCaretRight />
          <span>Contact Us</span>
        </div>
      </article>
      <article className="mt-9 bg-white border border-[#E7E7E7] rounded-[24px] justify-between  flex p-4 md:p-6 items-center gap-4">
        <div className="flex items-center gap-4">
          <FaTelegram color="#2AABEE" size={24} />

          <div className="flex text-[#333333] gap-1 flex-col">
            <p className="font-[300]">Telegram Link</p>
            <p className="font-semibold">Our Telegram Link</p>
          </div>
        </div>
        <button className="rounded-[12px] bg-[#A69F93] text-white px-6 py-3 text-sm font-bold">
          Open Link
        </button>
      </article>
      <article className="my-6 bg-white border border-[#E7E7E7] rounded-[24px] justify-between flex  p-4 md:p-6 items-center gap-4">
        <div className="flex items-center gap-4">
          <Mail size={24} />

          <div className="flex text-[#333333] gap-1 flex-col">
            <p className="font-[300]">Email Address</p>
            <p className="font-semibold">KellHoppen@gmail.com</p>
          </div>
        </div>
        <button className="rounded-[12px] bg-[#A69F93] text-white px-6 py-3 text-sm font-bold">
          Open Link
        </button>
      </article>
      <article className=" bg-white border border-[#E7E7E7] p-6 rounded-[24px] ">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] leading-[130%] text-[#454545] font-semibold">
            Contact Detail
          </h2>
          <button className="text-xs font-bold text-[#454545] px-3 py-2 border border-[#B0B0B0] rounded-[12px] hover:bg-amber-50 ">
            Make Call
          </button>
        </div>
        <div className="mt-5 flex w-full flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-bold leading-[150%] text-[#323130]">
              Phone Number
            </label>
            <div className="text-sm text-[#454545] font-bold w-full md:max-w-xs border px-4 py-3 block rounded-[12px] bg-[#E7E7E7] border-[#D1D1D1] ">
              +62 847 1723 1123
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-bold leading-[150%] text-[#323130]">
              Country
            </label>
            <div className="w-full text-sm font-bold text-[#454545] md:max-w-xs border px-4 py-3 block rounded-[12px] bg-[#E7E7E7] border-[#D1D1D1] ">
              Indonesia
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default page;
