// components/SignupPage.tsx
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsTelephone } from "react-icons/bs";
import { IoGiftOutline, IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { signup, clearError } from "@/store/reducers/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  phone: string;
  email: string;
  username: string;
  inviteCode: string;
}

interface FormErrors {
  phone?: string;
  email?: string;
  username?: string;
}

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    username: "",
    inviteCode: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Auto-fill referral code from URL params
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, inviteCode: refCode }));
    }

    return () => {
      dispatch(clearError());
    };
  }, [dispatch, searchParams]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateUsername = (username: string): boolean => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      errors.username =
        "Username must be at least 3 characters and contain only letters, numbers, and underscores";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    try {
      const signupData = {
        phone: formData.phone,
        email: formData.email,
        username: formData.username,
        ...(formData.inviteCode && { inviteCode: formData.inviteCode }),
      };

      const result = await dispatch(signup(signupData)).unwrap();

      // Store email for verification page
      localStorage.setItem("userEmail", formData.email);

      // Redirect to verification page instead of login
      router.push(
        `/signup-verification?email=${encodeURIComponent(formData.email)}`
      );
    } catch (error) {
      // Error is handled by Redux slice
    }
  };

  return (
    <section className="flex">
      <div className="w-full min-w-[50%] max-w-[816px]">
        <Image
          width={0}
          height={0}
          alt="signupimg"
          src={"/images/signupimg.png"}
          style={{ width: "100%", height: "100%" }}
          sizes="100vw"
        />
      </div>
      <div className="w-[45%] flex justify-center">
        <div className="w-full max-w-[517px] min-w-[80%] pt-22">
          <h1 className="justify-center text-[#333] text-5xl font-medium font-['Poppins']">
            Create Account
          </h1>

          {/* Show referral code notification */}
          {formData.inviteCode && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              You're signing up with referral code:{" "}
              <strong>{formData.inviteCode}</strong>
            </div>
          )}

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
                htmlFor="phone"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <BsTelephone />
                </span>
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`border rounded-full py-3 px-4 w-full ${
                  formErrors.phone ? "border-red-500" : "border-[#33333399]"
                }`}
                placeholder="Enter your phone number"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <MdEmail />
                </span>
                <span>Email Address *</span>
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

            <div className="w-full">
              <label
                htmlFor="username"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <IoPersonOutline />
                </span>
                <span>Username *</span>
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
                placeholder="Choose a username"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="inviteCode"
                className="flex items-center gap-2.5 text-[#333]/60 text-base font-normal font-['Poppins']"
              >
                <span>
                  <IoGiftOutline />
                </span>
                <span>Invitation Code (Optional)</span>
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleInputChange}
                className="border border-[#33333399] rounded-full py-3 px-4 w-full"
                placeholder="Enter invitation code if you have one"
              />
            </div>

            <p className="justify-start">
              <span className="text-[#333] text-sm font-normal font-['Poppins']">
                By signing up, you agree to the{" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                Terms of Service
              </span>
              <span className="text-[#333] text-sm font-normal font-['Poppins']">
                {" "}
                and{" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                Privacy Policy,
              </span>
              <br />
              <span className="text-[#111] text-sm font-normal font-['Poppins']">
                including{" "}
              </span>
              <span className="text-[#111] text-sm font-normal font-['Poppins'] underline">
                cookie use.
              </span>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-10 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-center justify-center text-xl font-normal font-['Poppins']">
                {isLoading ? "Creating Account..." : "Sign Up"}
              </span>
            </button>
          </form>

          <p className="mt-13 justify-start">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              Already have an account?{" "}
            </span>
            <Link
              href={"/login"}
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
