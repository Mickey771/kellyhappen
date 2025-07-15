"use client";
import HeroSlider from "@/components/user/HeroSlider";
import { Copy, X } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/store/store";

const page = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode; // Fallback if no user
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <main className="w-full p-7">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">
        Refer Your Friends
      </h2>
      <div className="my-10 p-4 md:p-10 w-full max-w-[517px] rounded-[30px] bg-gradient-to-r from-[#A69F93] to-[#734F10] text-white">
        <h2 className="text-center text-2xl font-bold">Invite a friend</h2>
        <p className="mt-6 text-xl leading-[150%] text-center">
          Your friend gets 25% bonus on every profit you make
        </p>
        <div className="mt-12 flex justify-center items-center gap-7">
          <button
            onClick={() => copyToClipboard(referralCode || "")}
            className="p-5 px-6 font-bold text-center flex items-center justify-center gap-2 border-2 border-dotted border-[#FFFFFF] bg-[#FCFCFE40] text-white rounded-[48px] hover:opacity-80 cursor-pointer"
          >
            <Copy />
            {copied ? "Copied!" : referralCode}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-5 px-6 font-bold hover:opacity-80 cursor-pointer text-center text-white bg-black rounded-[48px]"
          >
            Invite Friends
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <HeroSlider />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-[500px] mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-[#333333] mb-6 text-center">
              Invite Your Friends
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Referral Code
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(referralCode || "")}
                    className="p-3 bg-[#111] text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Copy size={16} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(referralLink)}
                    className="p-3 bg-[#111] text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Copy size={16} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Share your referral code or link with friends to earn rewards
                when they sign up!
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default page;
