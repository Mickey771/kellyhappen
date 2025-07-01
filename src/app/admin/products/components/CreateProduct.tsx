"use client";
interface Props {
  setCreate: Dispatch<SetStateAction<boolean>>;
}

import { Dispatch, SetStateAction, useState } from "react";
import CustomInput from "@/components/CustomInput";
import { Calendar, X } from "lucide-react";
import classNames from "react-day-picker/style.module.css";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import ImageUploader from "./ImageUploader";

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
const CreateProduct = ({ setCreate }: Props) => {
  const [createdDate, setCreatedDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
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
    console.log("Debit data:", data, createdDate, endDate);
    // Submit logic here
  };

  return (
    <article className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30">
      <section className=" max-h-9/10 w-full max-w-2xl overflow-y-auto rounded-lg bg-white py-6">
        <div className="flex items-center justify-between border-b border-[#2e5163] px-6 pb-4">
          <h2 className="text-lg font-medium text-[#191B1C]">Create Product</h2>
          <div
            onClick={() => setCreate(false)}
            className="size-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F5F6F7]"
          >
            <X size={20} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-6 px-6 pt-4 space-y-4"
        >
          <CustomInput
            kind="input"
            label="Product Name"
            placeholder="0"
            register={register}
            errors={errors}
            name="name"
          />
          <ImageUploader />
          <div className="flex gap-4 justify-between">
            <CustomInput
              kind="input"
              label="Price"
              placeholder="15"
              register={register}
              errors={errors}
              name="price"
              type="number"
              className="w-full"
            />
            <CustomInput
              kind="input"
              label="Negative Number "
              placeholder="15"
              register={register}
              errors={errors}
              name="negative"
              type="number"
              className="w-full"
            />
          </div>
          <article className="flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-[#191B1C]" htmlFor="created">
                Created Date
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    type="button"
                    id="created"
                    className="w-full h-10 shadow flex text-[#4A5154] px-4 items-center gap-4 border border-[#E5E7E8]"
                  >
                    <Calendar />
                    <span>{formatDayMonth(createdDate)}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  className="z-[9999] bg-white"
                >
                  <div className="bg-white z-9999">
                    <DayPicker
                      animate
                      required
                      mode="single"
                      selected={createdDate}
                      onSelect={setCreatedDate}
                      classNames={classNames}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" flex w-full flex-col gap-1">
              <label className="text-[#191B1C]" htmlFor="created">
                End Date
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    type="button"
                    id="created"
                    className="w-full shadow text-[#4A5154] px-4 h-10 flex items-center gap-4 border border-[#E5E7E8]"
                  >
                    <Calendar />
                    <span>{formatDayMonth(endDate)}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  className="z-[9999] bg-white"
                >
                  <div className="bg-white z-9999">
                    <DayPicker
                      animate
                      required
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      classNames={classNames}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </article>

          <div className="flex col-span-2 justify-between items-center">
            <button
              type="button"
              onClick={() => setCreate(false)}
              className="text-center cursor-pointer  bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
            >
              Cancel
            </button>
            <button className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3">
              Create Product
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default CreateProduct;
