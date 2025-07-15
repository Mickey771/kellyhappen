"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { forgotPassword, clearError } from "@/store/reducers/authSlice";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
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
      await dispatch(forgotPassword(formData.email)).unwrap();
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
              Check Your Email
            </h1>

            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="text-base font-normal font-['Poppins']">
                We've sent a password reset link to your email address. Please
                check your inbox and follow the instructions to reset your
                password.
              </p>
            </div>

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
            Forgot Password
          </h1>

          <p className="mt-4 text-[#333]/60 text-base font-normal font-['Poppins']">
            Enter your email address and we'll send you a link to reset your
            password.
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
                htmlFor="email"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <HiOutlineMail />
                </span>
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border rounded-full py-3 px-4 w-full ${
                  formErrors.email ? "border-red-500" : "border-[#33333399]"
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 md:mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-lg md:rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;
