import HeroSlider from "@/components/user/HeroSlider";
import { Copy } from "lucide-react";

const page = () => {
  return (
    <main className="  w-full p-7 ">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">
        Refer Your Friends
      </h2>
      <div className="my-10 p-4 md:p-10 w-full max-w-[517px] rounded-[30px] bg-gradient-to-r from-[#A69F93] to-[#734F10] text-white">
        <h2 className="text-center text-2xl font-bold">
          Invite a friend and get
        </h2>
        <p className="mt-6 text-xl leading-[150%] text-center">
          Give a friend promo code on $15 and you'll get $15 off your next NFT
          post.
        </p>
        <div className="mt-12 flex justify-center items-center gap-7">
          <button className="p-5 px-6 font-bold text-center flex items-center justify-center gap-2 border-2 border-dotted border-[#FFFFFF] bg-[#FCFCFE40] text-white rounded-[48px]">
            <Copy />
            GBD21
          </button>
          <button className="p-5 px-6 font-bold hover:opacity-80 cursor-pointer text-center text-white bg-black rounded-[48px]">
            Invite Friends
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <HeroSlider />
      </div>
    </main>
  );
};

export default page;
