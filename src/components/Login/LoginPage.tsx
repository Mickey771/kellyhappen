// components/LoginPage.tsx - Simplified without resend functionality
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { login, clearError } from "@/store/reducers/authSlice";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/user/dashboard");
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
      await dispatch(login(formData)).unwrap();
    } catch (error) {
      // Error handled by Redux slice
    }
  };

  return (
    <section className="h-lvh flex">
      <div className="hidden md:block w-full min-w-[50%] max-w-[816px]">
        <Image
          width={0}
          height={0}
          alt="loginimg"
          src={"/images/loginimg.png"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>
      <div className="w-full md:w-[45%] p-4 flex justify-center">
        <div className="w-full max-w-[517px] min-w-[80%] pt-22">
          <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
            Welcome Back
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
                <span>Username</span>
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
                placeholder="Enter your username"
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
                placeholder="Enter your password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/signup-verification"
                className="text-blue-600 text-sm font-normal font-['Poppins'] hover:underline"
              >
                Need your credentials resent?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                {isLoading ? "Logging in..." : "Log in"}
              </span>
            </button>
          </form>

          <p className="mt-13 justify-start">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              Don't have an account?{" "}
            </span>
            <Link
              href="/signup"
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
