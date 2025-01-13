// File: components/PopupOTP.tsx
'use client';
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OTPInput from "./OTPInput";
import CountdownTimer from "./CountDownTimer";
import { useRouter } from "next/navigation";
import apiService from "@/app/api/api";
import Cookies from 'js-cookie';

interface PopupOTPProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  requestKey: string | null;
}

export function PopupOTP({ email, isOpen, onClose, requestKey }: PopupOTPProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [otp, setOtp] = useState(""); // State untuk menyimpan OTP
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

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

  const handleVerification = async () => {
    // debugging
    // console.log("Request Key in PopupOTP:", requestKey);

    setIsLoading(true);
    // console.log("Request body:", {
    //   requestKey,
    //   secretValue: otp,
    // });

    try {
      const body = {
        "requestKey": requestKey,
        "secretValue": otp,
      }
      
      const response = await apiService.post<any>("/v1/auth/login/verification", body)

      if (!response.success) {
        throw new Error(response.message || 'Verifikasi gagal');
      }

      /* set token into cookies */
      console.log("Parsed response:", response.data);
      Cookies.set('token', response.data.token, {
        httpOnly: false, // Cannot use httpOnly on the client-side
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: 7 // 7 days
      });

      onClose();
      router.push("/");
    } catch (error) {
      console.error("Error during verification:", error);
      alert(error.message || "Terjadi kesalahan saat verifikasi");
    } finally {
      setIsLoading(false);
    }
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
          onClick={handleVerification}
          className={`w-full p-2 mt-3 rounded-3xl text-sm text-neutral-100 ${isValid ? "bg-primary-500" : "bg-neutral-400"}`}
        >
          Verifikasi
        </button>
        <CountdownTimer />
      </div>
    </div>
  );
}
