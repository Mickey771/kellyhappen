"use client";

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, CircleDot } from "lucide-react";
import React, { useRef, useState } from "react";

const designCollection = [
  {
    name: "Classic",
    image: "classic",
  },
  {
    name: "Home",
    image: "home",
  },
  {
    name: "Stores",
    image: "store",
  },
  {
    name: "Minimalist",
    image: "minimalist",
  },
  {
    name: "Scandinavian",
    image: "scandinavian",
  },
];

const Page = () => {
  return (
    <section className="p-7 ">
      <div className="pt-3 text-[#333333]">
        <h2 className="text-3xl font-bold">
          Welcome to Kelly Hoppen Interiors
        </h2>
        <div className="mt-5">
          <h4 className="text-2xl font-semibold">
            Our Interior Design Templates!
          </h4>
          <p>
            Let’s help inspire you to design your residence with our most
            popular interior designs. Earn money while doing so.
          </p>
        </div>
      </div>

      <div className="mt-6 ">
        <HeroSlider />
      </div>

      <article className="mt-8">
        <h2 className="capitalize text-[#333333] font-semibold text-2xl">
          Our design collection
        </h2>
        <BottomSlider />
      </article>
    </section>
  );
};

export default Page;

function HeroSlider() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
  };

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();
  const goToSlide = (index: number) => sliderRef.current?.slickGoTo(index);

  return (
    <div className="relative w-full ">
      {/* Custom Controls */}
      <div className="absolute top-3/4 left-0 right-0 z-10 h-18 w-fit mx-auto flex justify-center gap-5 bg-[#FFFFFF4D] rounded-[15px] items-center px-2 -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="bg-[#111111] size-6 md:size-10 flex items-center justify-center  rounded-[10px] "
        >
          <ChevronLeft className="md:size-5 size-4 text-white" />
        </button>

        <div className="flex items-center gap-2 px-2 py-1 rounded-full shadow">
          {designCollection.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer rounded-full size-4 sm:size-6 md:size-7 ${
                currentSlide === index ? "bg-[#A69F93]" : "bg-[#111111]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-[#A69F93] size-6 md:size-10 flex items-center justify-center  rounded-[10px] "
        >
          <ChevronRight className="md:size-5 size-4 text-white" />
        </button>
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {designCollection.map(({ name, image }, i) => (
          <div key={i}>
            <div className="h-[320px] bg-gray-100 flex items-center justify-center">
              <Image
                src={`/images/${image}one.jpg`}
                alt={name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover rounded-md"
              />
              <p className="absolute top-1/3 bg-[#A69F93] px-4 sm:px-6 md:px-10 py-3 rounded-[10px] text-2xl md:text-[40px] leading-[112.9%] text-[#111111]">
                {name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
function BottomSlider() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6">
      {/* Arrows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          className="bg-[#111111] size-10 flex items-center justify-center rounded-[10px]"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          className="bg-[#A69F93] size-10 flex items-center justify-center rounded-[10px]"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings} className="px-8">
        {designCollection.map(({ name, image }, i) => (
          <div key={i} className="px-2">
            {/* Each slide */}
            <div className="relative h-[312px] w-full max-w-[319px] bg-gray-100 rounded-[20px] overflow-hidden">
              <Image
                src={`/images/${image}two.jpg`}
                alt={name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-[#A69F93] px-5 py-3 rounded-[10px] text-[24px] leading-[112.9%] text-[#111111]">
                {name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
