"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError("Login dengan Google dibatalkan");
        setIsProcessing(false);
        toast.error("Login dibatalkan");
        setTimeout(() => router.push("/auth/login"), 2000);
        return;
      }

      if (!code) {
        setError("Kode autentikasi tidak ditemukan");
        setIsProcessing(false);
        toast.error("Autentikasi gagal");
        setTimeout(() => router.push("/auth/login"), 2000);
        return;
      }

      try {
        console.log("=== Google Callback - Processing ===");
        console.log("Authorization code received:", code?.substring(0, 20) + "...");
        
        // Kirim code ke backend, biar backend yang exchange dengan Google
        // Ini lebih aman karena Client Secret tetap di backend
        const loginResponse: any = await apiService.post("/v1/auth/google/login", {
          code: code,
          redirectUri: `${window.location.origin}/auth/google/callback`,
        });

        console.log("Backend response:", loginResponse.success);

        if (!loginResponse.success) {
          throw new Error(loginResponse.message || "Login dengan Google gagal");
        }

        // Jika berhasil, ambil token dan login
        const token = loginResponse.data?.token;
        if (token) {
          login(token);
          toast.success("Login dengan Google berhasil!");
          setTimeout(() => router.push("/"), 1000);
        } else {
          throw new Error("Token tidak ditemukan dalam response");
        }

      } catch (err: unknown) {
        console.error("=== Google login error ===");
        console.error("Error type:", typeof err);
        console.error("Error object:", err);
        
        let errorMessage = "Terjadi kesalahan saat login dengan Google";
        
        if (err instanceof Error) {
          errorMessage = err.message;
          console.error("Error message:", err.message);
          
          // Cek apakah ini error 404 atau endpoint tidak ada
          if (err.message.includes("API request failed") || err.message.includes("404")) {
            errorMessage = "Backend belum mendukung Google Login. Backend perlu implement endpoint: POST /v1/auth/google/login yang menerima { code, redirectUri } dan mengembalikan { success, data: { token, user } }";
          }
        }
        
        setError(errorMessage);
        toast.error(errorMessage);
        setTimeout(() => router.push("/auth/login"), 4000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-5">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <h2 className="text-xl font-bold text-neutral-700">
              Memproses login dengan Google...
            </h2>
            <p className="text-sm text-neutral-600">
              Mohon tunggu sebentar, kami sedang mengautentikasi akun Anda.
            </p>
          </>
        ) : error ? (
          <>
            <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-700">Login Gagal</h2>
            <p className="text-sm text-red-500">{error}</p>
            <p className="text-xs text-neutral-500">
              Anda akan diarahkan kembali ke halaman login...
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-700">
              Login Berhasil!
            </h2>
            <p className="text-sm text-neutral-600">
              Anda akan diarahkan ke halaman utama...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
