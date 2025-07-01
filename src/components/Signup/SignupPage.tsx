import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTelephone } from "react-icons/bs";
import { IoGiftOutline, IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";

const SignupPage = () => {
  return (
    <section className="flex">
      <div className="w-full min-w-[50%] max-w-[816px]  ">
        <Image
          width={0}
          height={0}
          alt="signupimg"
          src={"/images/signupimg.png"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>
      <div className="w-[45%]  flex justify-center">
        <div className="w-full  max-w-[517px] min-w-[80%] pt-22">
          <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
            Create Account
          </h1>

          <form className="w-full  flex flex-col gap-4 mt-13">
            <div className="w-full">
              <label
                htmlFor="phone"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <BsTelephone />
                </span>
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                id="phone"
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="username"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <IoPersonOutline />
                </span>
                <span>Username</span>
              </label>
              <input
                type="text"
                id="username"
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <TbLockPassword />
                </span>
                <span>Password</span>
              </label>
              <input
                type="password"
                id="password"
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <TbLockPassword />
                </span>
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="invitationcode"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <IoGiftOutline />
                </span>
                <span>Invitation code</span>
              </label>
              <input
                type="text"
                id="invitationcode"
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
              />
            </div>
            <p className=" justify-start">
              <span className="text-[#333]  text-sm font-normal font-['Poppins']">
                By signing up, you agree to the{" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                Terms of Service
              </span>
              <span className="text-stone-500 text-sm font-normal font-['Poppins']">
                {" "}
              </span>
              <span className="text-[#333] text-sm font-normal font-['Poppins']">
                and
              </span>
              <span className="text-stone-500 text-sm font-normal font-['Poppins']">
                {" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                Privacy Policy,
              </span>
              <br />
              <span className="text-[#111] text-sm font-normal font-['Poppins']">
                {" "}
                including{" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                cookie use.
              </span>
            </p>
            <button
              type="button"
              className="mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-[40px] overflow-hidden"
            >
              <span className="text-center justify-center  text-xl font-normal font-['Poppins']">
                Sign Up
              </span>
            </button>
          </form>
          <p className="mt-13 justify-start">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              Already have an account?{" "}
            </span>
            <Link
              href={"/login"}
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
