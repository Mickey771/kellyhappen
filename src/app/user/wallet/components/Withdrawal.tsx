// components/wallet/Withdrawal.tsx
import { useState } from "react";
import { Currency, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { createWithdrawal } from "@/store/reducers/userSlice";

export const Withdrawal = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    walletAddress: "",
    network: "",
    amount: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.walletAddress || !formData.network || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await dispatch(
        createWithdrawal({
          walletAddress: formData.walletAddress,
          network: formData.network,
          amount: parseFloat(formData.amount),
        })
      ).unwrap();

      alert("Withdrawal request submitted successfully!");
      setFormData({ walletAddress: "", network: "", amount: "" });
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <form className="space-y-3 max-w-md" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Wallet Address
        </label>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
          placeholder="Enter wallet address"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Network
        </label>
        <input
          type="text"
          name="network"
          value={formData.network}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
          placeholder="e.g., TRC20, ERC20"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Lock size={24} />
          Amount (USDT)
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="block w-full text-center py-4 text-xl rounded-[40px] px-6 bg-black text-white hover:opacity-80 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Withdrawal"}
      </button>
    </form>
  );
};
