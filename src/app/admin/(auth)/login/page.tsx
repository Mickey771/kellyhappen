"use client";
// components/admin/AdminLoginPage.tsx
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { adminLogin, clearError } from "@/store/reducers/adminAuthSlice";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.adminAuth
  );

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }

    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, router, dispatch]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(adminLogin(formData)).unwrap();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  return (
    <section className="h-lvh flex">
      <div className="w-full min-w-[50%] max-w-[816px]">
        <Image
          width={0}
          height={0}
          alt="adminloginimg"
          src={"/images/loginimg.png"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>
      <div className="w-[45%] flex justify-center">
        <div className="w-full max-w-[517px] min-w-[80%] pt-22">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              ADMIN
            </div>
          </div>

          <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
            Admin Portal
          </h1>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form
            className="w-full flex flex-col gap-4 mt-13"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <label
                htmlFor="username"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <IoPersonOutline />
                </span>
                <span>Admin Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`border rounded-full py-3 px-4 w-full ${
                  formErrors.username ? "border-red-500" : "border-[#33333399]"
                }`}
                placeholder="Enter admin username"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <TbLockPassword />
                </span>
                <span>Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border rounded-full py-3 px-4 w-full ${
                  formErrors.password ? "border-red-500" : "border-[#33333399]"
                }`}
                placeholder="Enter admin password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-10 cursor-pointer self-stretch h-16 relative bg-red-600 hover:bg-red-700 text-white border border-red-600 rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                {isLoading ? "Logging in..." : "Admin Login"}
              </span>
            </button>
          </form>

          <p className="mt-13 justify-start">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              User portal?{" "}
            </span>
            <Link
              href="/login"
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              User Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
