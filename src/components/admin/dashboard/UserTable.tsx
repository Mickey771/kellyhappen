// components/admin/dashboard/UserTable.tsx
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
import { ChevronDown, ChevronUp } from "lucide-react";
import ContinuousSingle from "./ContinousSingle";
import AddDebit from "./AddDebit";
import WalletInformation from "./WalletInformation";
import { useAppDispatch } from "@/store/store";
import { resetUserTasks } from "@/store/reducers/adminSlice";

interface UserTableProps {
  user: {
    id: number;
    username: string;
    phone: string;
    balance: number;
    level: number;
    completedTasks: number;
    createdAt: string;
  };
  i: number;
}

const UserTable = ({ user, i }: UserTableProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [continousSingle, setContinousSingle] = useState(false);
  const [showAddDebit, setShowAddDebit] = useState(false);
  const [showWalletInformation, setShowWalletInformation] = useState(false);

  const handleResetTasks = async () => {
    if (confirm(`Reset completed tasks for ${user.username}?`)) {
      try {
        await dispatch(resetUserTasks(user.id)).unwrap();
        alert("Tasks reset successfully!");
      } catch (error) {
        alert("Failed to reset tasks");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getLevelBadgeColor = (level: number) => {
    return level === 1
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getLevelText = (level: number) => {
    return level === 1 ? "Beginner" : "Premium";
  };

  return (
    <>
      <tr
        key={i}
        className={`${
          i % 2 === 0 ? "bg-none" : "bg-white"
        } text-sm text-gray-700`}
      >
        <td className="px-4 py-3">#{user.id}</td>
        <td className="px-4 py-3">{user.username}</td>
        <td className="px-4 py-3">{user.phone}</td>
        <td className="px-4 py-3">${user.balance}</td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
              user.level
            )}`}
          >
            {getLevelText(user.level)}
          </span>
        </td>
        <td className="px-4 py-3">{user.completedTasks}</td>
        <td className="px-4 py-3">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 bg-white hover:bg-blue-100 cursor-pointer outline-none border-[#EBEBEE] rounded-[30px] border px-3 py-2 text-sm">
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
                  className="text-sm font-medium flex justify-center cursor-pointer bg-[#F3F4F6] text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  Set Negative Override
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setShowAddDebit(true)}
                  className="text-sm font-medium flex justify-center bg-[#F3F4F6] cursor-pointer text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  Update Balance
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleResetTasks}
                  className="text-sm font-medium flex justify-center bg-[#F3F4F6] cursor-pointer text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  Reset Completed Tasks
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setShowWalletInformation(true)}
                  className="text-sm font-medium flex justify-center bg-[#F3F4F6] cursor-pointer transition text-[#333333CC] hover:text-white hover:bg-[#A69F93]"
                >
                  User Details
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>

      {continousSingle && (
        <ContinuousSingle setContinousSingle={setContinousSingle} user={user} />
      )}
      {showWalletInformation && (
        <WalletInformation setShow={setShowWalletInformation} user={user} />
      )}
      {showAddDebit && <AddDebit setShow={setShowAddDebit} user={user} />}
    </>
  );
};

export default UserTable;
