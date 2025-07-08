// components/admin/ContinuousSingle.tsx
"use client";
import { Calendar, MoveRight, X } from "lucide-react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUserNegativeOverride } from "@/store/reducers/adminSlice";
import { fetchProducts } from "@/store/reducers/adminProductSlice";

interface ContinuousSingleProps {
  setContinousSingle: Dispatch<SetStateAction<boolean>>;
  user: any;
}

const schema = z.object({
  negativeAmount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(0, "Amount cannot be negative"),
  applyToAll: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const ContinuousSingle = ({
  setContinousSingle,
  user,
}: ContinuousSingleProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.adminProduct);
  const { isLoading } = useAppSelector((state) => state.admin);

  const [showProducts, setShowProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      applyToAll: true,
      negativeAmount: 0,
    },
  });

  const applyToAll = watch("applyToAll");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    try {
      const productIds = data.applyToAll
        ? products.map((p) => p.id)
        : selectedProducts;

      if (!data.applyToAll && selectedProducts.length === 0) {
        alert("Please select at least one product");
        return;
      }

      await dispatch(
        setUserNegativeOverride({
          userId: user.id,
          productIds,
          negativeAmount: data.negativeAmount,
        })
      ).unwrap();

      alert("Negative amount override set successfully!");
      setContinousSingle(false);
    } catch (error) {
      // Error handled by Redux
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(products.map((p) => p.id));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-2xl py-6 max-h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
        <div className="px-6 pb-4 border-b border-[#2e5163] flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#191B1C]">
            Set Negative Amount Override
          </h2>
          <div
            onClick={() => setContinousSingle(false)}
            className="size-10 rounded-full bg-[#F5F6F7] flex justify-center cursor-pointer items-center"
          >
            <X size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <article className="p-6 space-y-4">
            {/* User Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
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
                  <span className="font-medium">Level:</span> {user.level}
                </p>
                <p>
                  <span className="font-medium">Completed Tasks:</span>{" "}
                  {user.completedTasks}
                </p>
              </div>
            </div>

            {/* Negative Amount Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[#191B1C] text-sm font-medium">
                Set Negative Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("negativeAmount", { valueAsNumber: true })}
                className="w-full border rounded-sm border-[#E5E7E8] p-3"
                placeholder="Enter negative amount"
              />
              {errors.negativeAmount && (
                <span className="text-red-500 text-sm">
                  {errors.negativeAmount.message}
                </span>
              )}
            </div>

            {/* Apply Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="applyToAll"
                  {...register("applyToAll")}
                  className="w-4 h-4"
                />
                <label htmlFor="applyToAll" className="text-[#191B1C] text-sm">
                  Apply to all products
                </label>
              </div>
            </div>

            {!applyToAll && (
              <div className="border border-[#E5E7E8] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-[#191B1C]">
                    Select Products
                  </h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAllProducts}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor={`product-${product.id}`}
                        className="flex-1 text-sm cursor-pointer"
                      >
                        {product.name} - ${product.price}
                      </label>
                    </div>
                  ))}
                </div>

                {!applyToAll && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {selectedProducts.length} product(s)
                  </p>
                )}
              </div>
            )}
          </article>

          <article className="px-6 pb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setContinousSingle(false)}
              className="cursor-pointer rounded-[160px] px-6 py-3 bg-[#F5F6F7] text-[#191B1C] text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-[160px] px-6 py-3 bg-[#A69F93] text-white text-sm font-semibold disabled:opacity-50"
            >
              {isLoading ? "Setting..." : "Set Override"}
            </button>
          </article>
        </form>
      </section>
    </article>
  );
};

export default ContinuousSingle;
