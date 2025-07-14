"use client";
import { Wallet, X, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile } from "@/store/reducers/userSlice";
import {
  fetchUserTasks,
  fetchAvailableProducts,
  submitTask,
} from "@/store/reducers/taskSlice";
import HeroSlider from "@/components/user/HeroSlider";
import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  userLevel: number;
  userBalance: number;
}

const ProductModal = ({
  isOpen,
  onClose,
  product,
  userLevel,
  userBalance,
}: ProductModalProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.task);

  if (!isOpen || !product) return null;

  const profitRate = userLevel === 1 ? 0.75 : 1;
  const totalPrice = (userBalance * profitRate) / 100;

  const handleSubmit = async () => {
    try {
      await dispatch(submitTask(product.id)).unwrap();
      dispatch(fetchProfile());
      alert("Task submitted successfully!");
      onClose();
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Next Available Task</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full h-[200px] mb-4">
          <Image
            src={product.image || "/images/classic2.svg"}
            alt={product.name}
            width={400}
            height={200}
            className="w-full h-full rounded-[20px] object-cover"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#171717]">{product.name}</h2>
          <div className="text-3xl font-bold text-[#A69F93]">
            ${product.price.toFixed(2)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 font-medium">Total Rebates</p>
              <p className="text-2xl font-bold text-[#171717]">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 font-medium">Debit Amount</p>
              <p className="text-2xl font-bold text-[#171717]">
                ${product.negativeAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {userBalance < product.negativeAmount && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-700 text-sm">
                Insufficient balance. Required: ${product.negativeAmount},
                Available: ${userBalance}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || userBalance < product.negativeAmount}
            className="w-full bg-black hover:bg-black/80 text-white rounded-[40px] py-4 text-xl font-medium disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Design"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);
  const { tasks, availableProducts } = useAppSelector((state) => state.task);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUserTasks());
    dispatch(fetchAvailableProducts());
  }, [dispatch]);

  const handleSubmitDesign = () => {
    if (availableProducts.length > 0) {
      setSelectedProduct(availableProducts[0]);
      setShowModal(true);
    } else {
      alert("No available tasks at the moment");
    }
  };

  const totalRebates = tasks.reduce((sum, task) => sum + task.profitEarned, 0);
  const maxTasks = profile?.level === 1 ? 33 : 38;
  const completedTasks = profile?.completedTasks || 0;
  const progressPercentage = (completedTasks / maxTasks) * 100;

  return (
    <section className="px-4 lg:px-10">
      <h2 className="text-3xl font-semibold text-[#333333] mt-10 mb-4">
        Your Design Data
      </h2>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <article className="w-full md:max-w-[280px] p-4 flex flex-col justify-between h-[152px] rounded-[20px] bg-[#A69F93]">
          <div className="flex justify-between md:flex-row flex-row-reverse items-center gap-4">
            <Wallet size={24} color="white" />
            <p className="text-base font-semibold text-white">
              Available Balance
            </p>
          </div>
          <p className="text-[48px] leading-[130%] font-bold text-white">
            ${profile?.balance?.toLocaleString() || "0"}
          </p>
        </article>

        <article className="w-full md:max-w-[280px] h-[152px] p-4 flex flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
          <p className="text-[#454545] leading-[130%] font-semibold">
            Total Rebates
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl leading-[130%] font-semibold text-[#171717]">
              ${totalRebates.toFixed(2)}
            </p>
            <div className="space-y-1 text-xs">
              <span className="font-bold text-[#04910C] text-right flex items-center gap-1">
                <TrendingUp size={12} />
                3.6%
              </span>
              <p className="text-[#737373] leading-[140%]">From last week</p>
            </div>
          </div>
        </article>

        <article className="w-full md:max-w-[280px] h-[152px] p-4 flex flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
          <p className="text-[#454545] leading-[130%] font-semibold">
            Total Completed
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl leading-[130%] font-semibold text-[#171717]">
              {completedTasks}
            </p>
            <div className="space-y-1 items-end text-xs">
              <span className="font-bold text-[#FF0000] text-right flex items-center gap-1">
                <TrendingDown size={12} />
                1.5%
              </span>
              <p className="text-[#737373] leading-[140%]">From last week</p>
            </div>
          </div>
        </article>
      </div>

      <article className="mt-4 w-full h-[160px] p-5 flex max-w-[900px] flex-col justify-between rounded-[20px] border shadow bg-white border-[#E7E7E7]">
        <p className="text-[#454545] leading-[130%] font-semibold">
          Design in processing
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[#737373] text-xs leading-[140%]">In Progress</p>
            <p className="text-[#454545] font-semibold leading-[130%]">
              {completedTasks}/
              <span className="text-[#737373]">{maxTasks}</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#737373] text-xs leading-[140%]">
              Sales Target
            </p>
            <p className="text-[#737373] font-semibold leading-[130%]">
              {maxTasks}
            </p>
          </div>
        </div>
        <CustomSlider value={progressPercentage} />
      </article>

      <button
        onClick={handleSubmitDesign}
        className="my-[22px] hidden md:block w-full max-w-[900px] bg-[#A69F93] rounded-[14px] py-3 text-center text-white hover:bg-[#A69F93]/80"
      >
        Submit Design
      </button>

      <article className="bg-gradient-to-r from-[#D7D0C6] to-[#655F56DE] max-w-[900px] text-white h-full md:h-[198px] rounded-[20px] mt-[24px] p-4 sm:p-6">
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-[130%]">
          Why Kelly Hoppen
        </h2>
        <p className="text-sm leading-[150%] mt-1">
          Kelly Hoppen is a renowned designer, known for her minimalist and
          luxurious approach to both residential and commercial spaces.
        </p>
        <button className="mt-4 rounded-[14px] px-6 py-3 outline-none cursor-pointer border border-[#A69F93] bg-white text-sm font-bold leading-[150%] text-[#A69F93]">
          Learn More
        </button>
      </article>

      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        userLevel={profile?.level || 1}
        userBalance={profile?.balance || 0}
      />

      <div className="mt-[26px]">
        <HeroSlider />
      </div>
    </section>
  );
};

function CustomSlider({ value }: { value: number }) {
  const percentage = Math.min(Math.max(value, 0), 100);

  const trackStyle = {
    background: `linear-gradient(to right, #8B7E6B 0%, #8B7E6B ${percentage}%, #E0F2FE ${percentage}%, #E0F2FE 100%)`,
  };

  return (
    <div style={trackStyle} className="w-full h-[20px] rounded-[12px] relative">
      <div
        className="absolute w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1/2 top-1/2 transition-all duration-150"
        style={{ left: `calc(${percentage}% - 12px)` }}
      />
    </div>
  );
}

export default Page;
