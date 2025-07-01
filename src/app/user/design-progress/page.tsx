"use client";
import HeroSlider from "@/components/user/HeroSlider";
import {
  CircleCheck,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
} from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { TbCalendarTime } from "react-icons/tb";

interface InteriorCardProps {
  title: string;
  price: number;
  rebate: number;
  total: number;
  date: string;
  time: string;
  image: string;
}
const filterBtns = [
  { title: "Pending", icon: <CircleEllipsis /> },
  { title: "Completed", icon: <CircleCheck /> },
];
const cardData = Array.from({ length: 10 }, (_, i) => ({
  title: `Classic Homes Interior ${i + 1}`,
  price: 500,
  rebate: 5,
  total: 5,
  date: "25–03–04",
  time: "06:09:16",
  image: "/images/classic2.svg",
}));

const page = () => {
  const [activeFilter, setActiveFilter] = useState(filterBtns[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-7">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">
        Design Progress List
      </h2>
      {/* filter with completed and pending */}
      <article className="mt-6 flex gap-7 items-center justify-between">
        <div className="flex gap-4 sm:gap-7 items-center">
          {filterBtns.map((btn, i) => (
            <div
              key={i}
              onClick={() => setActiveFilter(btn)}
              className={`${
                btn == activeFilter
                  ? "bg-[#171717] text-white"
                  : "border border-[#8888884D] text-[#888888]"
              }
              flex items-center cursor-pointer justify-center gap-4 rounded-[10px] py-2 px-4 md:px-7`}
            >
              {btn.icon}
              <p>{btn.title}</p>
            </div>
          ))}
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-[#111111] size-6 md:size-10 flex items-center justify-center  rounded-[10px] "
          >
            <ChevronLeft className="md:size-5 size-4 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-[#A69F93] size-6 md:size-10 flex items-center justify-center  rounded-[10px] "
          >
            <ChevronRight className="md:size-5 size-4 text-white" />
          </button>
        </div>
      </article>

      <div
        ref={scrollRef}
        className="sm:flex-row flex flex-col gap-4 my-10 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {cardData.map((card, index) => (
          <div key={index} className="min-w-[270px] flex-shrink-0">
            <InteriorCard {...card} />
          </div>
        ))}
      </div>
      <HeroSlider />
    </section>
  );
};

export default page;

const InteriorCard = ({
  title,
  price,
  rebate,
  total,
  date,
  time,
  image,
}: InteriorCardProps) => {
  return (
    <div className="rounded-[30px] bg-transparent sm:bg-white sm:shadow-sm p-4 max-w-md mx-auto sm:max-w-xs w-full ">
      <div className="w-full md:w-[270px] h-[143px] ">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full rounded-[20px] object-cover"
        />
      </div>

      <div className="mt-1 space-y-2">
        <p className="font-bold text-[#171717]">{title}</p>
        <h2 className="text-2xl font-bold text-[#A69F93]">
          ${price.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center text-sm py-2 border-gray-200">
        <div className="text-left">
          <p className="text-[#454545] font-semibold">Total Rebates</p>
          <p className="text-[#171717] text-xl  font-bold">
            ${rebate.toFixed(2)}
          </p>
        </div>
        <div className="border-l-5 border-[#171717] h-8" />
        <div className="text-right">
          <p className="text-[#454545] font-semibold">Total Price</p>
          <p className="text-[#171717] text-xl  font-bold">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="my-3 border border-[#E7E7E7] p-3 rounded-[16px] text-sm text-[#4A5154]">
        <div className="w-full flex items-center justify-between gap-1">
          <TbCalendarTime size={20} color="#171717B2" />
          <div>
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      <button className="w-full cursor-pointer bg-black hover:bg-black/50 text-white rounded-[40px] py-4 text-xl">
        Create
      </button>
    </div>
  );
};
