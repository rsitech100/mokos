'use client';
import { useState, useEffect } from "react";
// Fungsi untuk memecah total detik menjadi jam, menit, dan detik
export const formatTime = (totalSeconds: number) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { hours, minutes, seconds };
};

// Fungsi untuk mengatur countdown timer
export const useCountdown = (initialSeconds: number) => {
      const [timeLeft, setTimeLeft] = useState(initialSeconds);

      useEffect(() => {
            if (timeLeft <= 0) return;

            const interval = setInterval(() => {
                  setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
      }, [timeLeft]);

      return timeLeft;
};
