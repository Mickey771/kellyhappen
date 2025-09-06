"use client";

import CustomInput from "@/components/CustomInput";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/store/store";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  user: any;
}

const PasswordUpdate = ({ setShow, user }: Props) => {
  const { isLoading } = useAppSelector((state) => state.admin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: data.password,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Password updated successfully!");
        setShow(false);
      } else {
        alert("Failed to update password: " + result.message);
      }
    } catch (error) {
      alert("Failed to update password");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article className="fixed inset-0 bg-black/30 z-9999 flex justify-center items-center">
      <section className="w-full max-w-xl py-6 max-h-9/10 scrollbar-hide overflow-y-auto bg-white rounded-lg">
        <div className="flex items-center justify-between border-b border-[#2e5163] px-6 pb-4">
          <h2 className="text-lg font-medium text-[#191B1C]">
            Update User Password
          </h2>
          <div
            onClick={() => setShow(false)}
            className="size-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F5F6F7]"
          >
            <X size={20} />
          </div>
        </div>

        {/* User Information Display */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="font-medium text-[#191B1C] mb-3">User Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Username:</span>
              <p className="text-[#191B1C]">{user.username}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <p className="text-[#191B1C]">{user.email || "Not provided"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Phone:</span>
              <p className="text-[#191B1C]">{user.phone}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Member Since:</span>
              <p className="text-[#191B1C]">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Password Update Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-6 px-6 pt-4"
        >
          <h3 className="font-medium text-[#191B1C] mb-4">Set New Password</h3>

          <CustomInput
            kind="input"
            label="New Password"
            placeholder="Enter new password"
            register={register}
            errors={errors}
            name="password"
            type="password"
          />

          <CustomInput
            kind="input"
            label="Confirm Password"
            placeholder="Confirm new password"
            register={register}
            errors={errors}
            name="confirmPassword"
            type="password"
          />

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">
              Security Notice
            </h4>
            <p className="text-sm text-yellow-700">
              The user will need to log in again with their new password after
              this update.
            </p>
          </div>

          <div className="flex col-span-2 justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-center cursor-pointer bg-[#F5F6F7] text-[#191B1C] rounded-[160px] px-5 text-sm font-semibold py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="text-center text-white cursor-pointer bg-[#A69F93] rounded-[160px] px-5 text-sm font-semibold py-3 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default PasswordUpdate;
