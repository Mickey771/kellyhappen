"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TbLockPassword } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetPassword, clearError } from "@/store/reducers/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const tokenFromQuery = searchParams.get("token");
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(
        resetPassword({ token, password: formData.password })
      ).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  if (isSubmitted) {
    return (
      <section className="h-lvh flex-col md:flex-row flex">
        <div className=" md:block w-full min-w-[50%] h-[300px] md:h-full max-w-[816px]">
          <Image
            width={0}
            height={0}
            alt="loginimg"
            src={"/images/loginimg.png"}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] p-4 flex justify-center">
          <div className="w-full max-w-[517px] min-w-[80%] pt-5 md:pt-22">
            <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
              Password Reset
            </h1>

            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="text-base font-normal font-['Poppins']">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
            </div>

            <Link
              href="/login"
              className="mt-4 md:mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-lg md:rounded-[40px] overflow-hidden flex items-center justify-center"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                Continue to Login
              </span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-lvh flex-col md:flex-row flex">
      <div className=" md:block w-full min-w-[50%] h-[300px] md:h-full max-w-[816px]">
        <Image
          width={0}
          height={0}
          alt="loginimg"
          src={"/images/loginimg.png"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-[45%] p-4 flex justify-center">
        <div className="w-full max-w-[517px] min-w-[80%] pt-5 md:pt-22">
          <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
            Reset Password
          </h1>

          <p className="mt-4 text-[#333]/60 text-base font-normal font-['Poppins']">
            Please enter your new password below.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form
            className="w-full flex flex-col gap-4 mt-4 md:mt-13"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <label
                htmlFor="password"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <TbLockPassword />
                </span>
                <span>New Password</span>
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
                placeholder="Enter your new password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="confirmPassword"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <TbLockPassword />
                </span>
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`border rounded-full py-3 px-4 w-full ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-[#33333399]"
                }`}
                placeholder="Confirm your new password"
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 md:mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-lg md:rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                {isLoading ? "Resetting..." : "Reset Password"}
              </span>
            </button>
          </form>

          <p className="mt-4 md:mt-13 justify-start text-center">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              Remember your password?{" "}
            </span>
            <Link
              href="/login"
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
