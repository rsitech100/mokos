'use client';

import { useEffect, useState } from "react";

const CountdownTimer = () => {
      const [seconds, setSeconds] = useState(60); // Inisialization with 60 seconds

      useEffect(() => {
            if (seconds <= 0) return;

            const interval = setInterval(() => {
                  setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(interval);
      }, [seconds]);

      return (
            <p className="font-normal text-xs text-neutral-700 text-center mt-1">
                  Belum menerima kode verifikasi?{" "}
                  <span className="font-semibold">Tunggu {seconds} detik</span>
            </p>
      );
};

export default CountdownTimer;
