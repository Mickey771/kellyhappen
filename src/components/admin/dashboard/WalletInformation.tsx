"use client";

import CustomInput from "@/components/CustomInput";
import {
  TokenBTC,
  WalletMetamask,
  WalletCoinbase,
  WalletTrust,
  WalletRainbow,
  WalletArgent,
} from "@web3icons/react";
import { Calendar, ChevronDown, X } from "lucide-react";
import classNames from "react-day-picker/style.module.css";
import {
  ComponentType,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
const schema = z.object({
  name: z.string().min(0, "Name cannot be negative"),
  phone: z.string().min(0, "Name cannot be negative"),
  address: z.string().min(0, "Name cannot be negative"),
});

const web3Options = [
  {
    name: "Bitcoin",
    Icon: <TokenBTC size={24} variant="branded" />,
  },
  {
    name: "MetaMask",
    Icon: <WalletMetamask size={24} variant="branded" />,
  },
  {
    name: "Coinbase Wallet",
    Icon: <WalletCoinbase size={24} variant="branded" />,
  },

  {
    name: "Trust Wallet",
    Icon: <WalletTrust size={24} variant="branded" />,
  },
  {
    name: "Rainbow",
    Icon: <WalletRainbow size={24} variant="branded" />,
  },
  {
    name: "Argent",
    Icon: <WalletArgent size={24} variant="branded" />,
  },
];

type FormData = z.infer<typeof schema>;

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}
interface WalletOption {
  name: string;
  Icon: ReactNode;
}
const WalletInformation = ({ setShow }: Props) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletOption>(
    web3Options[0]
  );
  const [open, setOpen] = useState(false);
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
    setShow(false);
  };
  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-2xl py-6 max-h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
        <div className="flex items-center justify-between border-b border-[#2e5163] px-6 pb-4">
          <h2 className="text-lg font-medium text-[#191B1C]">
            Wallet Information
          </h2>
          <div
            onClick={() => setShow(false)}
            className="size-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F5F6F7]"
          >
            <X size={20} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-6 px-6 pt-4"
        >
          <CustomInput
            kind="input"
            label="Name"
            placeholder="Gregory Forman"
            register={register}
            errors={errors}
            name="name"
            type="text"
          />
          <CustomInput
            kind="input"
            label="Recipient’s Address"
            placeholder="lkjsdnpakerpgaioue8-983-5qnpdir;gaj;ajkbnpodn[poiser[vn[oithaob[ih[bn"
            register={register}
            errors={errors}
            name="address"
            type="text"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="wallet" className="text-sm  text-[#191B1C]">
              Payment Network
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-full border-[#E5E7E8] border flex items-center justify-between  rounded px-4 py-2 bg-white shadow">
                  <div className="flex items-center gap-2">
                    {selectedWallet.Icon}
                    <span>{selectedWallet.name}</span>
                  </div>
                  <span className="text-gray-500">
                    <ChevronDown />
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="z-[9999] w-full shadow border-[#E5E7E8] border bg-white"
              >
                <ul>
                  {web3Options.map((wallet) => (
                    <li
                      key={wallet.name}
                      onClick={() => setSelectedWallet(wallet)}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {wallet.Icon}
                      <span>{wallet.name}</span>
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CustomInput
            kind="input"
            label="Recipient’s Phone Number"
            placeholder="+144 567 876 6789"
            register={register}
            errors={errors}
            name="phone"
            type="text"
          />
          <div className="flex col-span-2 justify-between items-center">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-center cursor-pointer bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
            >
              Cancel
            </button>
            <button className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3">
              Edit Information
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default WalletInformation;
