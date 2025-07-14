import Image from "next/image";
import React from "react";
const workflowCards = [
  {
    icon: "/images/house.svg",
    title: "Smooth workflow",
    text: "We deliver the final work\nwith great professional\nway.",
    bg: "bg-white", // or just ""
    textColor: "text-neutral-900",
  },
  {
    icon: "/images/chair.svg",
    title: "Smooth workflow",
    text: "We deliver the final work\nwith great professional\nway.",
    bg: "bg-primaryBrown",
    textColor: "text-white",
  },
  {
    icon: "/images/wall.svg",
    title: "Smooth workflow",
    text: "We deliver the final work\nwith great professional\nway.",
    bg: "bg-white", // or just ""
    textColor: "text-neutral-900",
  },
];

const CreateYourSpace = () => {
  return (
    <section className="relative pt-[33px] md:pt-[100px] p-5 pb-[45px]">
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
      <div className="w-full max-w-max  mx-auto">
        <h1 className="justify-start text-neutral-900 text-[40px] leading-[130%] text-7xl font-normal font-Abril_Fatface md:leading-[95.12px]">
          Create your <br />
          Dream Space.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 md:mt-[90px]">
          {workflowCards.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col gap-11 py-12 px-[59px] ${card.bg}`}
            >
              <div className="w-full mx-auto max-w-[146px]">
                <Image
                  width={0}
                  height={0}
                  alt="icon"
                  src={card.icon}
                  style={{ width: "100%", height: "100%" }}
                  sizes="100vw"
                />
              </div>
              <div className="w-full mx-auto max-w-[278px]">
                <p
                  className={`md:text-3xl text-[24px] font-semibold font-['Visby_CF'] leading-[50px] md:leading-[64px] ${card.textColor}`}
                >
                  {card.title}
                </p>
                <p
                  className={`text-sm md:text-xl md:font-medium font-['Visby_CF'] leading-loose tracking-wide whitespace-pre-line ${card.textColor}/80`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateYourSpace;
