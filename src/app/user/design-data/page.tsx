"use client";
import { Wallet } from "lucide-react";

import { useState } from "react";
import HeroSlider from "@/components/user/HeroSlider";
const page = () => {
  return (
    <section className="px-4 lg:px-10">
      <h2 className=" text-3xl font-semibold text-[#333333] mt-10 mb-4">
        Your Design Data
      </h2>
      <div className="mt-4 flex flex-col md:flex-row gap-6">
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
          <p className="text-[#454545] leading-[130%] font-semibold">
            Total Rebates
          </p>
          <div className=" flex items-center justify-between">
            <p className="text-3xl leading-[130%] font-semibold text-[#171717]">
              12,000
            </p>
            <div className="space-y-1 text-xs">
              <span className=" font-bold text-[#04910C] text-right">3.6%</span>
              <p className="text-[#737373] leading-[140%]">From last week</p>
            </div>
          </div>
        </article>
        <article className="w-full md:max-w-[280px] h-[152px] p-4 flex flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
          <p className="text-[#454545] leading-[130%] font-semibold">
            Total Completed
          </p>
          <div className=" flex items-center justify-between">
            <p className="text-3xl leading-[130%] font-semibold text-[#171717]">
              5,000
            </p>
            <div className="space-y-1 items-end text-xs">
              <span className=" font-bold text-[#FF0000] text-right">1.5%</span>
              <p className="text-[#737373] leading-[140%]">From last week</p>
            </div>
          </div>
        </article>
      </div>
      <article className="mt-4 w-full h-[160px] p-5 flex max-w-[900px] flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
        <p className="text-[#454545] leading-[130%] font-semibold">
          Design in processing
        </p>
        <div className=" flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[#737373] text-xs leading-[140%]">In Progress</p>
            <p className="text-[#454545] font-semibold leading-[130%]">
              20/<span className="text-[#737373]">33</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#737373] text-xs leading-[140%]">
              Sales Target
            </p>
            <p className="text-[#737373] font-semibold leading-[130%]">33</p>
          </div>
        </div>
        <CustomSlider />
      </article>
      <button className="my-[22px] hidden md:block w-full max-w-[900px] bg-[#A69F93] rounded-[14px] py-3 text-center text-white">
        Creation
      </button>
      <article className="bg-gradient-to-r from-[#D7D0C6] to-[#655F56DE] max-w-[900px] text-white h-full md:h-[198px] rounded-[20px] mt-[24px] p-4 sm:p-6">
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-[130%]">
          Why Kelly Hoppen
        </h2>
        <p className="text-sm leading-[150%] mt-1">
          Kelly Hoppen is a renowned designer, known for her minimalist and
          luxurious approach to both residential and commercial spaces.
        </p>
        <button className="mt-4 rounded-[14px] px-6 py-3 outline-none cursor-pointer border border-[#A69F93] bg-white text-sm font-bold leading-[150%] text-[#A69F93]">
          Learn More
        </button>
      </article>
      <div className="mt-[26px]">
        <HeroSlider />
      </div>
    </section>
  );
};

export default page;

function CustomSlider() {
  const [value, setValue] = useState(60);

  const min = 0;
  const max = 100;

  // Calculate the percentage of the selected range
  const percentage = ((value - min) / (max - min)) * 100;

  // Inline background style
  const trackStyle = {
    background: `linear-gradient(to right, #8B7E6B 0%, #8B7E6B ${percentage}%, #E0F2FE ${percentage}%, #E0F2FE 100%)`,
  };

  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      onChange={(e) => setValue(Number(e.target.value))}
      style={trackStyle}
      className="w-full appearance-none bg-transparent cursor-pointer focus:outline-none
      rounded-[12px]

      [&::-webkit-slider-thumb]:w-6
      [&::-webkit-slider-thumb]:h-6
      [&::-webkit-slider-thumb]:-mt-1
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:bg-white
      [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,0.3)]
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:transition-all
      [&::-webkit-slider-thumb]:duration-150

      [&::-webkit-slider-runnable-track]:h-[20px]
      [&::-webkit-slider-runnable-track]:rounded-[12px]

      [&::-moz-range-thumb]:w-6
      [&::-moz-range-thumb]:h-6
      [&::-moz-range-thumb]:appearance-none
      [&::-moz-range-thumb]:bg-white
      [&::-moz-range-thumb]:border-[4px]
      [&::-moz-range-thumb]:border-blue-600
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:transition-all
      [&::-moz-range-thumb]:duration-150

      [&::-moz-range-track]:h-[20px]
      [&::-moz-range-track]:rounded-[12px]"
    />
  );
}
