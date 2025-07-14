"use client";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, CircleDot } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DesignType {
  name: string;
  image: string;
}
const designCollection: DesignType[] = [
  {
    name: "Classic",
    image: "/images/classic2.svg",
  },
  {
    name: "Home",
    image: "/images/classic2.svg",
  },
  {
    name: "Stores",
    image: "/images/classic2.svg",
  },
  {
    name: "Minimalist",
    image: "/images/classic2.svg",
  },
  {
    name: "Scandinavian",
    image: "/images/classic2.svg",
  },
];
export default function HeroSlider({
  data,
  mainClassName,
}: {
  data?: DesignType[];
  mainClassName?: string;
}) {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [collections, setCollections] = useState(designCollection);
  useEffect(() => {
    if (data) setCollections(data);
  }, [data]);
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
          {collections.map((_, index) => (
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
            <div
              className={cn(
                mainClassName,
                "h-[290px] bg-gray-100 flex items-center justify-center"
              )}
            >
              <Image
                src={image}
                alt={name}
                width={0}
                height={0}
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
