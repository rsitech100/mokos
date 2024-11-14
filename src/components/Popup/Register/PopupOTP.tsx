// File: components/PopupOTP.tsx
'use client';
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OTPInput from "./OTPInput";
import CountdownTimer from "./CountDownTimer";

interface PopupOTPProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PopupOTP({ isOpen, onClose }: PopupOTPProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
    setIsValid(pin.length === 6);
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
          <span className="font-bold">repo@email.com</span>
        </p>
        <OTPInput length={6} onComplete={handleComplete} />
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full p-2 mt-3 rounded-3xl text-sm text-neutral-100 ${isValid ? "bg-primary-500" : "bg-neutral-400"}`}
        >
          Verifikasi
        </button>
        <CountdownTimer />
      </div>
    </div>
  );
}
