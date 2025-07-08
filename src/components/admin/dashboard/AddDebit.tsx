// components/admin/AddDebit.tsx
"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateUserBalance } from "@/store/reducers/adminSlice";

interface AddDebitProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  user: any;
}

interface Deposit {
  id: number;
  amount: number;
  network: string;
  walletAddress: string;
  status: string;
  createdAt: string;
}

const schema = z.object({
  balance: z.number({ invalid_type_error: "Balance must be a number" }),
});

type FormData = z.infer<typeof schema>;

const AddDebit = ({ setShow, user }: AddDebitProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState<"balance" | "deposits">("balance");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loadingDeposits, setLoadingDeposits] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      balance: user.balance,
    },
  });

  useEffect(() => {
    if (activeTab === "deposits") {
      fetchUserDeposits();
    }
  }, [activeTab]);

  const fetchUserDeposits = async () => {
    setLoadingDeposits(true);
    try {
      const response = await fetch(`/api/admin/users/${user.id}/deposits`);
      const data = await response.json();
      if (data.success) {
        setDeposits(data.deposits);
      }
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
    } finally {
      setLoadingDeposits(false);
    }
  };

  const handleDepositAction = async (
    depositId: number,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await fetch(
        `/api/admin/deposits/${depositId}/${action}`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(`Deposit ${action}d successfully!`);
        fetchUserDeposits(); // Refresh deposits
      } else {
        alert(`Failed to ${action} deposit`);
      }
    } catch (error) {
      alert(`Failed to ${action} deposit`);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(
        updateUserBalance({
          userId: user.id,
          balance: data.balance,
        })
      ).unwrap();

      alert("Balance updated successfully!");
      setShow(false);
    } catch (error) {
      alert("Failed to update balance");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-lg">
        <div className="px-6 py-4 border-b border-[#2e5163] flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#191B1C]">
            User Management
          </h2>
          <div
            onClick={() => setShow(false)}
            className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
          >
            <X size={20} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("balance")}
            className={`px-6 py-3 font-medium ${
              activeTab === "balance"
                ? "border-b-2 border-[#A69F93] text-[#A69F93]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Update Balance
          </button>
          <button
            onClick={() => setActiveTab("deposits")}
            className={`px-6 py-3 font-medium ${
              activeTab === "deposits"
                ? "border-b-2 border-[#A69F93] text-[#A69F93]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Deposit Requests
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          {/* User Info */}
          <div className="p-6 bg-gray-50">
            <h3 className="font-medium text-[#191B1C] mb-2">
              User Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-medium">Current Balance:</span> $
                {user.balance}
              </p>
              <p>
                <span className="font-medium">Level:</span>{" "}
                {user.level === 1 ? "Beginner" : "Premium"}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
            </div>
          </div>

          {activeTab === "balance" && (
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[#191B1C] text-sm font-medium">
                  New Balance ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("balance", { valueAsNumber: true })}
                  className="w-full border rounded-sm border-[#E5E7E8] p-3"
                  placeholder="Enter new balance"
                />
                {errors.balance && (
                  <span className="text-red-500 text-sm">
                    {errors.balance.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="cursor-pointer rounded-[160px] px-6 py-3 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-[160px] px-6 py-3 bg-[#A69F93] text-white text-sm font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Update Balance"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "deposits" && (
            <div className="p-6">
              {loadingDeposits ? (
                <div className="text-center py-8">Loading deposits...</div>
              ) : deposits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No deposit requests found
                </div>
              ) : (
                <div className="space-y-4">
                  {deposits.map((deposit) => (
                    <div
                      key={deposit.id}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-lg">
                            ${deposit.amount} USDT
                          </p>
                          <p className="text-sm text-gray-600">
                            {deposit.network}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            deposit.status
                          )}`}
                        >
                          {deposit.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500 space-y-1 mb-4">
                        <p>
                          <span className="font-medium">Wallet:</span>{" "}
                          {deposit.walletAddress}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(deposit.createdAt)}
                        </p>
                      </div>

                      {deposit.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleDepositAction(deposit.id, "approve")
                            }
                            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleDepositAction(deposit.id, "reject")
                            }
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </article>
  );
};

export default AddDebit;
