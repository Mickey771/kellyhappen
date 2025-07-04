import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroSlider from "../user/HeroSlider";

const Banner = () => {
  return (
    <>
      <section className="bg-[#111111] pt-11 p-5 md:p-0 flex flex-col items-center">
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

        <h1 className="mt-10 text-center  justify-start text-primaryBrown text-[40px] leading-[130%] md:text-6xl font-normal font-['Abril_Fatface'] md:leading-[72.32px]">
          Over 45 Years of
          <br />
          Design Innovation
        </h1>
        <p className="mt-[15px]  w-full max-w-[861px] text-center justify-start">
          <span className="text-primaryBrown text-[14px] md:text-lg font-normal font-['Poppins'] leading-6  md:leading-7">
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
      </section>
      <article className="p-5 bg-[#111111] w-full md:pb-0 mx-auto">
        <HeroSlider mainClassName="!h-[390px] md:!h-[653px] max-w-[1256px]" />
      </article>
    </>
  );
};

export default Banner;
