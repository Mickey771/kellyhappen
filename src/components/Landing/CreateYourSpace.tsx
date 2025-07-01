import Image from "next/image";
import React from "react";

const CreateYourSpace = () => {
  return (
    <section className="relative pt-[100px] pb-[45px]">
      <div className="absolute right-0 -top-14">
        <div className="w-full max-w-[511px] ">
          <Image
            width={0}
            height={0}
            alt="logo"
            src={"/images/creampatch.svg"}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
      </div>
      <div className="w-full max-w-max mx-auto">
        <h1 className="justify-start text-neutral-900 text-7xl font-normal font-Abril_Fatface leading-[95.12px]">
          Create your <br />
          Dream Space.
        </h1>

        <div className="grid grid-cols-3 mt-[90px]">
          <div className="flex flex-col gap-11 py-12 px-[59px]">
            <div className="w-full max-w-[146px] ">
              <Image
                width={0}
                height={0}
                alt="logo"
                src={"/images/house.svg"}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
              />
            </div>
            <div>
              <p className="justify-start text-neutral-900 text-3xl font-semibold font-['Visby_CF'] leading-[64px]">
                Smooth workflow
              </p>
              <p className="justify-start text-neutral-900/80 text-xl font-medium font-['Visby_CF'] leading-loose tracking-wide">
                We deliver the final work
                <br />
                with great professional
                <br />
                way.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-11 py-12 px-[59px] bg-primaryBrown">
            <div className="w-full max-w-[146px] ">
              <Image
                width={0}
                height={0}
                alt="logo"
                src={"/images/chair.svg"}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
              />
            </div>
            <div>
              <p className="justify-start text-white text-3xl font-semibold font-['Visby_CF'] leading-[64px]">
                Smooth workflow
              </p>
              <p className="justify-start text-white/80 text-xl font-medium font-['Visby_CF'] leading-loose tracking-wide">
                We deliver the final work
                <br />
                with great professional
                <br />
                way.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-11 py-12 px-[59px]">
            <div className="w-full max-w-[146px] ">
              <Image
                width={0}
                height={0}
                alt="logo"
                src={"/images/wall.svg"}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
              />
            </div>
            <div>
              <p className="justify-start text-neutral-900 text-3xl font-semibold font-['Visby_CF'] leading-[64px]">
                Smooth workflow
              </p>
              <p className="justify-start text-neutral-900/80 text-xl font-medium font-['Visby_CF'] leading-loose tracking-wide">
                We deliver the final work
                <br />
                with great professional
                <br />
                way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateYourSpace;
