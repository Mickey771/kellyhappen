// components/wallet/WalletInfo.tsx
import { useState, useEffect } from "react";
import { Phone, Currency, MapPin } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateProfile } from "@/store/reducers/userSlice";

export const WalletInfo = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    phone: "",
    walletNetwork: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        walletAddress: profile.walletAddress || "",
        phone: profile.phone || "",
        walletNetwork: profile.walletNetwork || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      await dispatch(updateProfile(formDataToSend)).unwrap();
      alert("Profile updated successfully!");
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <form className="max-w-md space-y-3" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <CiUser size={24} />
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <MapPin size={24} />
          Wallet Address
        </label>
        <input
          type="text"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Phone size={24} />
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-1 text-[#33333399] text-base">
          <Currency size={24} />
          Network
        </label>
        <input
          type="text"
          name="walletNetwork"
          value={formData.walletNetwork}
          onChange={handleInputChange}
          className="w-full border border-[#33333399] shadow bg-white outline-none rounded-[32px] p-3"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="block w-full text-center py-4 text-xl rounded-[40px] px-6 bg-black text-white hover:opacity-80 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Submit"}
      </button>
    </form>
  );
};
