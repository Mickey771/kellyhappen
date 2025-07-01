import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="bg-[#111111] pt-11 flex flex-col items-center">
      <div className="w-full max-w-[84px] h-[95px] ">
        <Image
          width={0}
          height={0}
          alt="logo"
          src={"/logo.svg"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>

      <h1 className="mt-10 text-center justify-start text-primaryBrown text-6xl font-normal font-['Abril_Fatface'] leading-[72.32px]">
        Over 45 Years of
        <br />
        Design Innovation
      </h1>
      <p className="mt-[15px] w-[861px] text-center justify-start">
        <span className="text-primaryBrown text-lg font-normal font-['Poppins'] leading-7">
          KELLY HOPPEN INTERIORS{" "}
        </span>
        <span className="text-primaryBrown text-lg font-normal font-['Poppins'] lowercase leading-7">
          IS DEDICATED TO DELIVERING MULTI-FACETED COUTURE PROJECTS TO THE
          HIGHEST LEVELS OF DESIGN, OFFERING A COMPLETELY PERSONALIZED SERVICE
          TO EACH CLIENT AROUND THE WORLD.
        </span>
      </p>
      <Link href={"/signup"}>
        <button className="cursor-pointer mt-[15px] w-56 p-2.5 bg-primaryBrown hover:bg-transparent text-[#111111] hover:text-primaryBrown  border border-primaryBrown  rounded-[10px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
          <span className="text-center justify-start  text-base font-semibold font-['Montserrat'] leading-tight">
            Get Started
          </span>
        </button>
      </Link>

      <div
        className="relative h-[654px] max-w-[1256px] w-full mt-[27px] border-2 "
        style={{
          backgroundImage: "url(/images/banner.png)",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000033] flex flex-col items-center justify-end pb-[68px]">
          <button className="w-fit px-10 py-3.5 bg-primaryBrown rounded-[10px] inline-flex justify-center items-center gap-2.5">
            <span className="text-center justify-start text-[#111111] text-4xl font-normal font-['Abril_Fatface'] leading-10">
              Classic
            </span>
          </button>

          <div className="mt-[140px] flex gap-11 items-center">
            <button className="inline-flex bg-[#111111] py-3 px-3.5 rounded-[10px] text-white ">
              <FaChevronLeft />
            </button>
            <div className="flex gap-4">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="w-7 h-7 bg-[#111111] rounded-full" />
              ))}
            </div>
            <button className="inline-flex bg-primaryBrown py-3 px-3.5 rounded-[10px] text-white ">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
