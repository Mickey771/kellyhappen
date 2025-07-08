// components/admin/EditProduct.tsx
"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import CustomInput from "@/components/CustomInput";
import { Calendar, X } from "lucide-react";
import classNames from "react-day-picker/style.module.css";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import ImageUploader from "./ImageUploader";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateProduct } from "@/store/reducers/adminProductSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  setEdit: Dispatch<SetStateAction<boolean>>;
  product: any;
}

const schema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  negativeAmount: z.string().min(1, "Negative amount is required"),
});

type FormData = z.infer<typeof schema>;

const EditProduct = ({ setEdit, product }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.adminProduct);

  const [endDate, setEndDate] = useState<Date>(new Date(product.endDate));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(product.isActive);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product.name,
      price: `${product.price}`,
      negativeAmount: `${product.negativeAmount}`,
    },
  });

  const formatDayMonth = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("negativeAmount", data.negativeAmount.toString());
      formData.append("endDate", endDate.toISOString());
      formData.append("isActive", isActive.toString());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await dispatch(updateProduct({ id: product.id, formData })).unwrap();
      alert("Product updated successfully!");
      setEdit(false);
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <article className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30">
      <section className="max-h-9/10 w-full max-w-2xl overflow-y-auto rounded-lg bg-white py-6">
        <div className="flex items-center justify-between border-b border-[#2e5163] px-6 pb-4">
          <h2 className="text-lg font-medium text-[#191B1C]">Edit Product</h2>
          <div
            onClick={() => setEdit(false)}
            className="size-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F5F6F7]"
          >
            <X size={20} />
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 px-6 pt-4 space-y-4"
        >
          <CustomInput
            kind="input"
            label="Product Name"
            placeholder="Enter product name"
            register={register}
            errors={errors}
            name="name"
          />

          <div className="flex flex-col gap-1">
            <label className="text-[#191B1C]">Current Image</label>
            {product.image && (
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.name}
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            <label className="text-[#191B1C] mt-2">
              Upload New Image (Optional)
            </label>
            <ImageUploader onFileSelect={setSelectedFile} />
          </div>

          <div className="flex gap-4 justify-between">
            <CustomInput
              kind="input"
              label="Price"
              placeholder="15"
              register={register}
              errors={errors}
              name="price"
              type="number"
              step="0.01"
              className="w-full"
            />
            <CustomInput
              kind="input"
              label="Negative Amount"
              placeholder="15"
              register={register}
              errors={errors}
              name="negativeAmount"
              type="number"
              step="0.01"
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-1">
              <label className="text-[#191B1C]" htmlFor="endDate">
                End Date
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    type="button"
                    id="endDate"
                    className="w-full shadow text-[#4A5154] px-4 h-10 flex items-center gap-4 border border-[#E5E7E8]"
                  >
                    <Calendar />
                    <span>{formatDayMonth(endDate)}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  className="z-[9999] bg-white"
                >
                  <div className="bg-white z-9999">
                    <DayPicker
                      animate
                      required
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      classNames={classNames}
                      disabled={{ before: new Date() }}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="text-[#191B1C]">Status</label>
              <select
                value={isActive.toString()}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full shadow text-[#4A5154] px-4 h-10 border border-[#E5E7E8]"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex col-span-2 justify-between items-center">
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="text-center cursor-pointer bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default EditProduct;
