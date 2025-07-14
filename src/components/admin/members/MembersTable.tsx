"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown";
import { Calendar, ChevronDown, ChevronUp, MoveRight, X } from "lucide-react";
import ContinousSingle from "../dashboard/ContinousSingle";
import WalletInformation from "../dashboard/WalletInformation";
import AddDebit from "../dashboard/AddDebit";
interface UserTableProps {
  user: any;
  i: number;
}
const MembersTable = ({ user, i }: UserTableProps) => {
  const [open, setOpen] = useState(false);
  const [continousSingle, setContinousSingle] = useState(false);
  const [showAddDebit, setShowAddDebit] = useState(false);
  const [showWalletInformation, setShowWalletInformation] = useState(false);
  return (
    <>
      <tr
        key={i}
        className={`${
          i % 2 === 0 ? "bg-none" : "bg-white"
        } text-sm text-gray-700`}
      >
        <td className="px-4 py-3">{user.id}</td>
        <td className="px-4 py-3">{user.username}</td>
        <td className="px-4 py-3">{user.phone}</td>
        <td className="px-4 py-3">{user.balance}</td>
        <td className="px-4 py-3">{user.dailyOrders}</td>
        <td className="px-4 py-3">{user.todayOrders}</td>
        <td className="px-4 py-3">{user.commission}</td>
        <td className="px-4 py-3">{user.reputation}</td>
        <td className="px-4 py-3">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 bg-white hover:bg-blue-100 cursor-pointer outline-none border-[#EBEBEE] rounded-[30px] border px-3 py-2  text-sm">
                Action <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-65 p-5 bg-white border border-[#EBEBEE] rounded-[30px]">
              <DropdownMenuLabel
                className="flex items-center cursor-pointer bg-[#F3F4F6] justify-center"
                onClick={() => setOpen(false)}
              >
                Action <ChevronUp />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setContinousSingle(true)}
                  className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93] "
                >
                  Set continuous Single
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setShowAddDebit(true)}
                  className="text-sm font-medium  flex justify-center bg-[#F3F4F6] cursor-pointer text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  Add Debit
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-sm font-medium  flex justify-center bg-[#F3F4F6] cursor-pointer text-[#333333CC] hover:text-white hover:bg-[#A69F93]">
                  <span className="text-center">
                    Reset Number of Robbed Orders
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setShowWalletInformation(true)}
                  className="text-sm font-medium  flex justify-center bg-[#F3F4F6] cursor-pointer transition text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  Wallet Information
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
      {/* {continousSingle && (
        <ContinousSingle setContinousSingle={setContinousSingle} />
      )}
      {showWalletInformation && (
        <WalletInformation setShow={setShowWalletInformation} />
      )}
      {showAddDebit && <AddDebit setShow={setShowAddDebit} />} */}
    </>
  );
};
export default MembersTable;
