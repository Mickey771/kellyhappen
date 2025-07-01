"use client";

import { useForm } from "react-hook-form";
import BeginnerIcon from "@/assets/BeginnerIcon";
import { CircleCheck, Eye, EyeOff, Pencil, SquarePen } from "lucide-react";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineLiveHelp } from "react-icons/md";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const page = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "Cameron",
      lastName: "Willaimson",
      email: "user123@gmail.com",
      phone: "24533",
      country: "indosenia",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="p-6">
      <article className="my-4">
        <h2 className="text-3xl font-semibold text-[#333333]">Profile</h2>
        <div className="flex text-sm items-center text-[#888888] gap-4">
          <span>Dashboard</span>
          <FaCaretRight />
          <span>Profile</span>
        </div>
      </article>
      <article className="mt-9 bg-white border border-[#E7E7E7] rounded-[24px] justify-between  flex p-4 md:p-6 items-center gap-4">
        <div className="flex items-center gap-4">
          <BeginnerIcon />
          <div className="flex text-[#333333] gap-1 flex-col">
            <p className="font-[300]">Unlock 0.75%</p>
            <p className="font-semibold">Beginner Designer</p>
          </div>
        </div>
        <button className="cursor-pointer hover:opacity-70 rounded-[12px] bg-[#A69F93] text-white px-6 py-3 text-sm font-bold">
          Update Level
        </button>
      </article>
      <article className="mt-5 p-6 bg-white border border-[#E7E7E7]  rounded-[24px]">
        <h3 className="text-[22px] text-[#454545] font-semibold leading-[130%]">
          Profile Information
        </h3>
        <div className="mt-5 flex items-center gap-4">
          <Image
            src="/images/avatar30.svg" // Replace with your actual avatar path
            alt="User"
            width={73}
            height={54}
            className="rounded-md object-cover"
          />
          <div className="text-[#454545] p-2 flex items-center gap-2 hover:opacity-70 cursor-pointer border border-[#B0B0B0] rounded-[12px]">
            <span className="text-xs leading-[140%] font-bold">
              Change Picture
            </span>
            <SquarePen />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-5 gap-4 bg-white grid lg:grid-cols-2"
        >
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 font-bold text-sm text-[#323130]"
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block mb-1 font-bold text-sm text-[#323130]"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block mb-1 font-bold text-sm text-[#323130]"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex items-center col-span-2 gap-2">
            <button className="cursor-pointer hover:opacity-70 rounded-[12px] bg-[#A69F93] text-white px-6 py-3 text-sm font-bold">
              Update
            </button>
            <button className="underline text-sm text-[#A69F93] font-bold">
              Cancel
            </button>
          </div>
        </form>
      </article>
      <article className="mt-5 p-6 bg-white border border-[#E7E7E7] rounded-[24px]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[22px] text-[#454545] font-semibold leading-[130%]">
            Contact Detail
          </h2>
          <div className="text-[#454545] p-2 flex items-center gap-2 hover:opacity-70 cursor-pointer border border-[#B0B0B0] rounded-[12px]">
            <SquarePen />

            <span className="text-xs leading-[140%] font-bold">Edit</span>
          </div>
        </div>
        <div className="flex gap-4 mt-5 justify-between">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-3  gap-4 bg-white md:flex "
          >
            <div className="">
              <label
                htmlFor="email"
                className="block mb-1 font-bold text-sm text-[#323130]"
              >
                Phone Number
              </label>
              <input
                {...register("phone")}
                id="phone"
                className="w-full border border-[#D1D1D1] md:max-w-xs bg-[#E7E7E7] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="country"
                className="block mb-1 font-bold text-sm text-[#323130]"
              >
                Country
              </label>
              <input
                {...register("country")}
                id="country"
                className="w-full border border-[#D1D1D1] bg-[#E7E7E7] md:max-w-xs rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold"
              />
              {errors.country && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </form>
          <div className="h-15 w-15 shadow text-white flex justify-center items-center rounded-full bg-[#A69F93]">
            <MdOutlineLiveHelp size={32} />
          </div>
        </div>
      </article>
      <article className="mt-5 p-6 bg-white border border-[#E7E7E7] rounded-[24px]">
        <h2 className="text-[22px] text-[#454545] font-semibold leading-[130%] mb-4">
          Password
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-1 font-bold text-sm text-[#323130]"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  {...register("oldPassword")}
                  type={showOld ? "text" : "password"}
                  id="oldPassword"
                  className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-1 font-bold text-sm text-[#323130]"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showNew ? "text" : "password"}
                  id="newPassword"
                  className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-bold text-sm text-[#323130]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full border border-[#D1D1D1] rounded-[12px] px-4 py-3 outline-none text-sm text-[#454545] font-bold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Password requirements */}
        <ul className="mt-6 mb-4 space-y-2 text-sm text-[#454545] font-medium">
          <li className="flex items-center gap-2">
            <CircleCheck className="text-[#1A71F6] w-4 h-4" />
            Minimum 8 characters.
          </li>
          <li className="flex items-center gap-2">
            <CircleCheck className="text-[#1A71F6] w-4 h-4" />
            Use combination of uppercase and lowercase letters.
          </li>
          <li className="flex items-center gap-2">
            <CircleCheck className="text-[#1A71F6] w-4 h-4" />
            Use of special characters (e.g., !, @, #, $, %)
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button
            type="submit"
            className="rounded-[12px] bg-[#A69F93] text-white px-6 py-3 text-sm font-bold"
          >
            Update Password
          </button>
          <button className="underline text-sm text-[#A69F93] font-bold">
            Cancel
          </button>
        </div>
      </article>
    </section>
  );
};

export default page;
