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
import { ChevronDown, X } from "lucide-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/store";

const schema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
});

const networkOptions = [
  {
    name: "TRC20 (Tron)",
    Icon: <TokenBTC size={24} variant="branded" />,
  },
  {
    name: "ERC20 (Ethereum)",
    Icon: <WalletMetamask size={24} variant="branded" />,
  },
  {
    name: "BEP20 (BSC)",
    Icon: <WalletCoinbase size={24} variant="branded" />,
  },
  {
    name: "Polygon",
    Icon: <WalletTrust size={24} variant="branded" />,
  },
  {
    name: "Arbitrum",
    Icon: <WalletRainbow size={24} variant="branded" />,
  },
  {
    name: "Optimism",
    Icon: <WalletArgent size={24} variant="branded" />,
  },
];

type FormData = z.infer<typeof schema>;

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  user: any;
}

interface NetworkOption {
  name: string;
  Icon: ReactNode;
}

const WalletInformation = ({ setShow, user }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.admin);

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(
    networkOptions.find((n) => n.name === user.walletNetwork) ||
      networkOptions[0]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      walletAddress: user.walletAddress || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}/wallet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: data.walletAddress,
          walletNetwork: selectedNetwork.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Wallet information updated successfully!");
        setShow(false);
      } else {
        alert("Failed to update wallet information");
      }
    } catch (error) {
      alert("Failed to update wallet information");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-2xl py-6 max-h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
        <div className="flex items-center justify-between border-b border-[#2e5163] px-6 pb-4">
          <h2 className="text-lg font-medium text-[#191B1C]">
            User Wallet Information
          </h2>
          <div
            onClick={() => setShow(false)}
            className="size-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F5F6F7]"
          >
            <X size={20} />
          </div>
        </div>

        {/* User Information Display */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-medium text-[#191B1C] mb-3">User Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Username:</span>
              <p className="text-[#191B1C]">{user.username}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <p className="text-[#191B1C]">{user.email || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Phone:</span>
              <p className="text-[#191B1C]">{user.phone}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Balance:</span>
              <p className="text-[#191B1C]">${user.balance}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Level:</span>
              <p className="text-[#191B1C]">
                {user.level === 1 ? "Beginner" : "Premium"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">
                Completed Tasks:
              </span>
              <p className="text-[#191B1C]">{user.completedTasks}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Country:</span>
              <p className="text-[#191B1C]">{user.country || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Member Since:</span>
              <p className="text-[#191B1C]">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Wallet Information Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-6 px-6 pt-4"
        >
          <h3 className="font-medium text-[#191B1C] mb-4">
            Edit Wallet Information
          </h3>

          <CustomInput
            kind="input"
            label="Wallet Address"
            placeholder="Enter wallet address"
            register={register}
            errors={errors}
            name="walletAddress"
            type="text"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="network" className="text-sm text-[#191B1C]">
              Payment Network
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-full border-[#E5E7E8] border flex items-center justify-between rounded px-4 py-2 bg-white shadow">
                  <div className="flex items-center gap-2">
                    {selectedNetwork.Icon}
                    <span>{selectedNetwork.name}</span>
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
                  {networkOptions.map((network) => (
                    <li
                      key={network.name}
                      onClick={() => setSelectedNetwork(network)}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {network.Icon}
                      <span>{network.name}</span>
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Current Wallet Info */}
          {(user.walletAddress || user.walletNetwork) && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Current Wallet Info
              </h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Network:</span>{" "}
                  {user.walletNetwork || "Not set"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {user.walletAddress || "Not set"}
                </p>
              </div>
            </div>
          )}

          <div className="flex col-span-2 justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-center cursor-pointer bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Wallet"}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default WalletInformation;
