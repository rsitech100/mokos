'use client';

import { useEffect, useState } from "react";

const CountdownTimer = ({ onFinish }: { onFinish: () => void }) => {
      const [seconds, setSeconds] = useState(60);

      useEffect(() => {
            if (seconds <= 0) {
                  onFinish(); // ⬅️ panggil callback
                  return;
            }

            const interval = setInterval(() => {
                  setSeconds((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
      }, [seconds, onFinish]);

      return (
            <p className="font-normal text-xs text-neutral-700 text-center mt-1">
                  Belum menerima kode verifikasi?{" "}
                  <span className="font-semibold">Tunggu {seconds} detik</span>
            </p>
      );
};

export default CountdownTimer;
