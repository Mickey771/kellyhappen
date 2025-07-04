import Image from "next/image";
import React from "react";

const ProvidingInnovativeDesign = () => {
  return (
    <section className="bg-[#111111] py-20">
      <h2 className="max-w-max mx-auto text-right justify-start text-stone-400 text-[40px] md:text-7xl font-normal font-['Abril_Fatface'] leading-[130%] md:leading-[95.12px]">
        Providing Innovative
        <br />
        Interior Design.
      </h2>

      <div className="relative flex justify-end my-5 md:mt-[90px]">
        <div className="absolute left-0 top-0 bg-white w-full max-w-[50%] h-[252px] md:h-[600px]"></div>
        <div className="relative mt-[190px] w-[60%] h-[360px] md:h-[578px] bg-[#111] pt-[80px] md:pt-[155px]">
          <div className="absolute w-full md:max-w-[90%] -left-[47px] top-[10px]">
            <div className="absolute -top-6 -left-6 bg-[#111]  h-[200px] md:h-[440px] w-1/2 md:w-[40%]"></div>
            <div className="w-full h-[183px] md:h-[428px] relative z-[2] ">
              <Image
                width={0}
                height={0}
                alt="logo"
                src={"/images/room.png"}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
                className="object-cover rounded-br-[35%]"
              />
            </div>
          </div>
          <div className="  w-full h-[325px] md:h-[620px] rounded-tr-[70%]  bg-primaryBrown  md:p-[60px] p-4 md:pt-[100px] flex flex-col gap-10 justify-end">
            <p className="max-w-[697px] justify-start hidden md:block pt-[50px] text-black text-sm md:text-xl font-normal font-['Plus_Jakarta_Sans'] leading-loose">
              Since 1999, we have been providing great flooring solutions and
              customer service for homeowners and commercial clients. among
              flooring materials, none is more elegant and luxurious than
              natural stone.
            </p>
            <p className="max-w-[697px] md:hidden justify-start pt-[50px] text-black text-sm md:text-xl font-normal font-['Plus_Jakarta_Sans'] leading-loose">
              We are known for our solutions in interior designs over the years
              and our customers know us well.
            </p>
            <div className="max-w-[697px] flex justify-between">
              <button className="w-fit px-7 py-4 bg-neutral-900 inline-flex justify-center items-center gap-2.5 overflow-hidden">
                <span className="justify-start text-white text-base font-semibold font-['Visby_CF'] leading-tight">
                  About Us
                </span>
              </button>
              <div className="w-full hidden md:block  max-w-[94px] ">
                <Image
                  width={0}
                  height={0}
                  alt="logo"
                  src={"/images/rightarrowlong.svg"}
                  style={{ width: "100%", height: "100%" }}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvidingInnovativeDesign;
