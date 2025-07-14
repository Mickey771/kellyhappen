// components/SignupVerification.tsx
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resendCredentials, clearError } from "@/store/reducers/authSlice";

const SignupVerification = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const query = window.location.search.split("?")[1];

  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    // Get email from router query or localStorage
    const userEmail = (query as string) || localStorage.getItem("userEmail");

    if (!userEmail) {
      router.push("/signup");
      return;
    }

    setEmail(userEmail);
    setMaskedEmail(maskEmail(userEmail));

    // Start countdown on component mount
    startCountdown();

    return () => {
      dispatch(clearError());
    };
  }, [router, dispatch]);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(60); // 1 minute
    setCanResend(false);
  };

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
    return `${maskedLocal}@${domain}`;
  };

  const handleResend = async () => {
    if (!email || !canResend) return;

    try {
      await dispatch(resendCredentials(email)).unwrap();
      alert("New credentials sent to your email!");
      startCountdown(); // Start countdown after successful resend
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <section className="h-lvh flex flex-col md:flex-row">
      <div className="w-full min-w-[50%] h-[300px] md:h-full max-w-[816px]">
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
          <div>
            <img src="/logo.svg" alt="logo" />
          </div>
          <h1 className="justify-center mt-[52px] text-[#333] text-5xl font-medium font-['Poppins']">
            Check Your Email
          </h1>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <p className="my-5 md:my-[60px] justify-start">
            <span className="text-[#333] text-base font-normal font-['Poppins']">
              Your login and password details have been sent to your email:{" "}
            </span>
            <span className="text-[#111] text-base font-normal font-['Poppins'] underline">
              {maskedEmail}
            </span>
          </p>

          <p className="mt-[60px] justify-start">
            <span className="text-[#333] text-lg font-normal font-['Poppins']">
              Haven't received an email?
            </span>
            {!canResend && countdown > 0 && (
              <span className="block text-sm text-gray-500 mt-2">
                You can resend in {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "0")}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading || !canResend}
            className="w-full mt-5 cursor-pointer self-stretch h-16 relative bg-[#111] hover:bg-white text-white hover:text-[#111] border border-[#111] rounded-[40px] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-center justify-center text-xl font-normal font-['Poppins']">
              {isLoading
                ? "Sending..."
                : canResend
                ? "Resend Credentials"
                : `Wait ${countdown}s`}
            </span>
          </button>

          <p className="mt-13 justify-start">
            <span className="text-zinc-800 text-lg font-medium font-['Poppins']">
              Ready to login?{" "}
            </span>
            <Link
              href="/login"
              className="text-blue-600 text-lg font-bold font-['Poppins']"
            >
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupVerification;
