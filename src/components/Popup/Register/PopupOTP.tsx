'use client';
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OTPInput from "./OTPInput";
import CountdownTimer from "./CountDownTimer";
import { handleVerification } from "@/app/api/v1/auth/login/verification/handleVerification";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
interface PopupOTPProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  requestKey: string | null;
  type: "register" | "login" | "forgot-password";
}

export function PopupOTP({ email, isOpen, onClose, requestKey, type }: PopupOTPProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [otp, setOtp] = useState(""); // State untuk menyimpan OTP
  const [isLoading, setIsLoading] = useState(false);

  // Cek apakah tampilan adalah mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Cek saat komponen pertama kali dirender
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Cegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleComplete = (pin: string) => {
    setOtp(pin); // Simpan OTP ke state
    setIsValid(pin.length === 5); // Validasi panjang OTP
  };

  const handleVerificationProcess = () => {
    handleVerification({
      requestKey,
      otp,
      type,
      onClose,
      router,
      setIsLoading,
      login,
    });
  };

  return (
    <div
      className={`fixed inset-0 ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"} flex items-center justify-center px-5 lg:px-0`}
    >
      <div className={`${isMobile ? "w-full h-full py-5" : "bg-white rounded-lg p-6 max-w-sm w-full"} flex flex-col gap-2`}>
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-gray-700">Kode Verifikasi</h4>
          <button onClick={onClose} className="hidden md:flex">
            <IoIosClose color="#191717" size={30} />
          </button>
        </div>
        <p className="text-gray-700 text-sm">
          Kode verifikasi telah dikirim melalui email ke{" "}
          <span className="font-bold">{email}</span>
        </p>
        <OTPInput length={5} onComplete={handleComplete} />
        <button
          type="submit"
          disabled={!isValid || isLoading}
          onClick={handleVerificationProcess}
          className={`w-full p-3 mt-4 rounded-3xl text-sm font-semibold text-neutral-100 transition-all ${isValid && !isLoading ? "bg-primary-500 hover:bg-primary-600 cursor-pointer" : "bg-neutral-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi"}
        </button>
        <CountdownTimer onFinish={onClose} />
      </div>
    </div>
  );
}
