// File: components/OTPInput.tsx
'use client';
import { useRef, useState } from "react";

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OTPInput = ({ length = 5, onComplete }: InputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Hanya izinkan angka atau kosong

    const newOTP = [...OTP];
    newOTP[index] = value;
    setOTP(newOTP);

    // Pindahkan fokus ke input berikutnya
    if (value && index < length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }

    // Jika semua input terisi, panggil onComplete dan blur untuk zoom out di mobile
    if (newOTP.every((digit) => digit !== "")) {
      onComplete(newOTP.join(""));
      // Blur semua input untuk zoom out di mobile
      inputRefs.current.forEach(input => input?.blur());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace' && !OTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-5 mx-auto gap-4 md:mx-0 md:gap-0">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={OTP[index]}
          maxLength={1}
          onChange={(e) => handleTextChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
