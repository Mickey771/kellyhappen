"use client";
import HeroSlider from "@/components/user/HeroSlider";
import {
  CircleCheck,
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
  X,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { TbCalendarTime } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchUserTasks,
  fetchAvailableProducts,
  submitTask,
  clearError,
} from "@/store/reducers/taskSlice";
import { fetchProfile } from "@/store/reducers/userSlice";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

interface InteriorCardProps {
  task: any;
  onClick: () => void;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  userLevel: number;
  userBalance: number;
}

const filterBtns = [
  { title: "Pending", icon: <CircleEllipsis /> },
  { title: "Completed", icon: <CircleCheck /> },
];

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
      dispatch(fetchProfile()); // Refresh user profile
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
          <h3 className="text-xl font-bold">Product Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full h-[200px] mb-4">
          <img
            src={`${base_url}${product?.image}` || "/images/classic2.svg"}
            alt={product.name}
            width={400}
            height={200}
            className="w-full h-full rounded-[20px] object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#171717]">
              {product.name}
            </h2>
            <p className="text-gray-600 mt-2">
              This interior design is used in homes, especially in the living
              rooms. Specific sets are used for beauty.
            </p>
          </div>

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

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TbCalendarTime size={20} />
              <span className="font-medium">Creation Time</span>
            </div>
            <p className="text-gray-600">
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-1">Design Code</p>
            <p className="text-gray-600 font-mono text-sm">
              {Math.random().toString().substring(2, 18)}
            </p>
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
            className="w-full bg-black hover:bg-black/80 text-white rounded-[40px] py-4 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const dispatch = useAppDispatch();
  const { tasks, availableProducts, isLoading, error } = useAppSelector(
    (state) => state.task
  );
  const { profile } = useAppSelector((state) => state.user);

  const [activeFilter, setActiveFilter] = useState(filterBtns[0]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUserTasks());
    dispatch(fetchAvailableProducts());
    dispatch(fetchProfile());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredTasks = tasks.filter(
    (task) => (activeFilter.title === "Completed" ? true : false) // Show completed tasks or available products
  );

  return (
    <section className="p-7">
      <h2 className="text-3xl py-4 font-bold text-[#333333]">
        Design Progress List
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <article className="mt-6 flex gap-7 items-center justify-between">
        <div className="flex gap-4 sm:gap-7 items-center">
          {filterBtns.map((btn, i) => (
            <div
              key={i}
              onClick={() => setActiveFilter(btn)}
              className={`${
                btn == activeFilter
                  ? "bg-[#171717] text-white"
                  : "border border-[#8888884D] text-[#888888]"
              }
              flex items-center cursor-pointer justify-center gap-4 rounded-[10px] py-2 px-4 md:px-7`}
            >
              {btn.icon}
              <p>{btn.title}</p>
            </div>
          ))}
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-[#111111] size-6 md:size-10 flex items-center justify-center rounded-[10px]"
          >
            <ChevronLeft className="md:size-5 size-4 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-[#A69F93] size-6 md:size-10 flex items-center justify-center rounded-[10px]"
          >
            <ChevronRight className="md:size-5 size-4 text-white" />
          </button>
        </div>
      </article>

      <div
        ref={scrollRef}
        className="sm:flex-row flex flex-col gap-4 my-10 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p>Loading...</p>
          </div>
        ) : activeFilter.title === "Completed" ? (
          filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No completed tasks found
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="min-w-[270px] flex-shrink-0">
                <InteriorCard task={task} onClick={() => {}} />
              </div>
            ))
          )
        ) : availableProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No available products found
          </div>
        ) : (
          availableProducts.map((product) => (
            <div key={product.id} className="min-w-[270px] flex-shrink-0">
              <ProductCard
                product={product}
                userLevel={profile?.level || 1}
                onClick={() => handleProductClick(product)}
                userBalance={profile?.balance || 0}
              />
            </div>
          ))
        )}
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        userLevel={profile?.level || 1}
        userBalance={profile?.balance || 0}
      />

      <HeroSlider />
    </section>
  );
};

const InteriorCard = ({ task, onClick }: InteriorCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  };

  const { date, time } = formatDate(task.createdAt);

  return (
    <div className="rounded-[30px] bg-transparent sm:bg-white sm:shadow-sm p-4 max-w-md mx-auto sm:max-w-xs w-full">
      <div className="w-full md:w-[270px] h-[143px]">
        <img
          src={`${base_url}${task?.product?.image}` || "/images/classic2.svg"}
          alt={task.product.name}
          width={500}
          height={300}
          className="w-full h-full rounded-[20px] object-cover"
        />
      </div>

      <div className="mt-1 space-y-2">
        <p className="font-bold text-[#171717]">{task.product.name}</p>
        <h2 className="text-2xl font-bold text-[#A69F93]">
          ${task.product.price.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center text-sm py-2 border-gray-200">
        <div className="text-left">
          <p className="text-[#454545] font-semibold">Total Rebates</p>
          <p className="text-[#171717] text-xl font-bold">
            ${task.profitEarned.toFixed(2)}
          </p>
        </div>
        <div className="border-l-5 border-[#171717] h-8" />
        <div className="text-right">
          <p className="text-[#454545] font-semibold">Amount Debited</p>
          <p className="text-[#171717] text-xl font-bold">
            ${task.amountDebited.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="my-3 border border-[#E7E7E7] p-3 rounded-[16px] text-sm text-[#4A5154]">
        <div className="w-full flex items-center justify-between gap-1">
          <TbCalendarTime size={20} color="#171717B2" />
          <div>
            <span>{date} </span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-green-100 text-green-800 rounded-[40px] py-4 text-xl text-center font-medium">
        Completed
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  userLevel,
  onClick,
  userBalance,
}: {
  product: any;
  userLevel: number;
  onClick: () => void;
  userBalance: number;
}) => {
  const profitRate = userLevel === 1 ? 0.75 : 1;
  const totalPrice = (userBalance * profitRate) / 100;

  return (
    <div className="rounded-[30px] bg-transparent sm:bg-white sm:shadow-sm p-4 max-w-md mx-auto sm:max-w-xs w-full">
      <div className="w-full md:w-[270px] h-[143px]">
        <img
          src={`${base_url}${product?.image}` || "/images/classic2.svg"}
          alt={product.name}
          width={500}
          height={300}
          className="w-full h-full rounded-[20px] object-cover"
        />
      </div>

      <div className="mt-1 space-y-2">
        <p className="font-bold text-[#171717]">{product.name}</p>
        <h2 className="text-2xl font-bold text-[#A69F93]">
          ${product.price.toFixed(2)}
        </h2>
      </div>

      <div className="flex justify-between items-center text-sm py-2 border-gray-200">
        <div className="text-left">
          <p className="text-[#454545] font-semibold">Total Rebates</p>
          <p className="text-[#171717] text-xl font-bold">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="border-l-5 border-[#171717] h-8" />
        <div className="text-right">
          <p className="text-[#454545] font-semibold">Debit Amount</p>
          <p className="text-[#171717] text-xl font-bold">
            ${product.negativeAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="my-3 border border-[#E7E7E7] p-3 rounded-[16px] text-sm text-[#4A5154]">
        <div className="w-full flex items-center justify-between gap-1">
          <TbCalendarTime size={20} color="#171717B2" />
          <div>
            <span>Available until: </span>
            <span>{new Date(product.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onClick}
        className="w-full cursor-pointer bg-black hover:bg-black/50 text-white rounded-[40px] py-4 text-xl"
      >
        Create
      </button>
    </div>
  );
};

export default Page;
