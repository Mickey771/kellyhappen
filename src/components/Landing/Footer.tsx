import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#111] py-[56px]">
      <div className="w-full max-w-max mx-auto">
        <div className="flex gap-3 items-end">
          <div className="w-full max-w-[63px] relative z-[2] ">
            <Image
              width={0}
              height={0}
              alt="logo"
              src={"/logobig.svg"}
              style={{ width: "100%", height: "100%" }}
              sizes="100vw"
            />
          </div>
          <div className="w-full max-w-[294px] relative z-[2] ">
            <Image
              width={0}
              height={0}
              alt="logo"
              src={"/logotext.svg"}
              style={{ width: "100%", height: "100%" }}
              sizes="100vw"
            />
          </div>
        </div>
        <p className="w-72 mt-10 justify-start">
          <span className="text-stone-400 text-3xl font-normal font-['Poppins'] leading-loose">
            Address:
            <br />
          </span>
          <span className="text-stone-400 text-xl font-normal font-['Poppins'] leading-loose">
            Kelly Hoppen Interiors Ltd,
            <br />
            Unit 5, Vencourt Place,
            <br />
            London, W6 9NU.
          </span>
        </p>
        <div className="mt-[170px] flex justify-between">
          <p className="justify-start text-zinc-600 text-base font-normal font-['Poppins']">
            © Copyright 2025 KellyHoppen ― All Rights Reserved.
          </p>
          <div className="flex items-center gap-[50px]">
            <p className="text-right justify-start text-zinc-600 text-base font-medium font-['Visby_CF']">
              Privacy Policy
            </p>
            <p className="text-right justify-start text-zinc-600 text-base font-medium font-['Visby_CF']">
              Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
