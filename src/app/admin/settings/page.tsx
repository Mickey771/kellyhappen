"use client";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { CiUser } from "react-icons/ci";
import { EllipsisVertical, Lock, Mail, Pencil } from "lucide-react";
const buttons = ["Profile"];
const adminTypeArray = [{ label: "Administrative", value: "administarative" }];
const schema = z.object({
  balance: z
    .number({ invalid_type_error: "Balance must be a number" })
    .min(0, "Balance cannot be negative"),
  orders: z
    .number({ invalid_type_error: "Balance must be a number" })
    .min(0, "Balance cannot be negative"),
  negative: z
    .number({ invalid_type_error: "Balance must be a number" })
    .min(0, "Balance cannot be negative"),
  debit: z
    .number({ invalid_type_error: "Balance must be a number" })
    .min(0, "Balance cannot be negative"),
});

type FormData = z.infer<typeof schema>;
const page = () => {
  const [activeBtn, setActiveBtn] = useState(buttons[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formatDayMonth = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric", // use 'long' for full month name
    });
  };

  const onSubmit = (data: FormData) => {
    console.log("Debit data:", data);
    // Submit logic here
  };
  return (
    <main>
      <div className="mt-7">
        <h2 className="text-[#202224] text-3xl font-bold">Settings</h2>
        <p>Control your profile setup and integrations</p>
      </div>
      <div className="flex items-center gap-4 my-5">
        {buttons.map((btn, i) => {
          return (
            <button
              key={i}
              className={`${
                activeBtn == btn ? "border-b border-[#A69F93]" : ""
              } text-sm font-medium text-[#A69F93] cursor-pointer`}
              onClick={() => setActiveBtn(btn)}
            >
              {btn}
            </button>
          );
        })}
      </div>
      <article className="flex gap-5">
        <section className="bg-white p-6 border border-[#EDEDF2] shadow w-full max-w-[538px]">
          <h2 className="text-[#1A1A21] text-xl font-semibold">
            Profile Settings
          </h2>
          <p className="text-[#8C94A6] leading-[145%]">
            These are your personal details, they are visible to the public
          </p>
          <div className="py-2 justify-between mt-8 flex items-center">
            <article className="flex items-center gap-4">
              <div className="h-12  relative">
                <Image
                  src="/images/avatar23.svg"
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="bg-[#A69F93] flex items-center justify-center absolute bottom-0 right-0 size-5 text-white p-1 rounded-full">
                  <Pencil color="white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#101928]">
                  Gregory Foreman
                </h4>
                <p className="text-sm text-[#475467]">
                  gregroeyforman@example.com
                </p>
              </div>
            </article>
            <button className="rounded-full p-1 hover:bg-gray-50 cursor-pointer">
              <EllipsisVertical className="w-6 h-6 text-[#475367]" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-6  pt-4 space-y-6"
          >
            <CustomInput
              kind="input"
              label="Full Name"
              placeholder="John Mercy Brown"
              register={register}
              errors={errors}
              name="name"
              className="w-full"
              leftIcon={<CiUser />}
            />
            <CustomInput
              kind="input"
              label="Email"
              placeholder="johnmercy03@gmail.com"
              register={register}
              errors={errors}
              name="name"
              className="w-full"
              leftIcon={<Mail />}
            />
            <CustomInput
              kind="select"
              label="Admin Type"
              register={register}
              errors={errors}
              data={adminTypeArray}
              name="adminType"
              className="w-full"
            />
            <div className="flex col-span-2 justify-between items-center">
              <button
                type="button"
                className="text-center cursor-pointer  bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
              >
                Cancel
              </button>
              <button className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3">
                Save Changes
              </button>
            </div>
          </form>
        </section>
        <section className="bg-white h-fit p-6 border border-[#EDEDF2] shadow w-full max-w-[538px]">
          <h2 className="text-[#1A1A21] text-xl font-semibold">
            Update Password
          </h2>
          <p className="text-[#8C94A6] leading-[145%]">
            Enter your current password to make update
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-6  pt-4 space-y-6"
          >
            <CustomInput
              kind="input"
              label="Current Password"
              placeholder="Enter password"
              register={register}
              errors={errors}
              name="currentPassword"
              type="password"
              className="w-full"
              leftIcon={<Lock />}
            />
            <CustomInput
              kind="input"
              label="New Password"
              placeholder="Enter new Password"
              register={register}
              errors={errors}
              name="newPassword"
              type="password"
              className="w-full"
              leftIcon={<Lock />}
            />

            <div className="flex col-span-2 justify-end items-center">
              <button className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3">
                Update Password
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
};

export default page;
