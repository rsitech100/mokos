// handleVerification.ts
import apiService from "@/app/api/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

interface VerificationParams {
      requestKey: string | null;
      otp: string;
      type: "register" | "login";
      onClose: () => void;
      router: AppRouterInstance;
      setIsLoading: (loading: boolean) => void;
      login?: (token: string) => void; // Tambahkan fungsi login dari AuthContext
}

interface ApiResponse<T = unknown> {
      success: boolean;
      message?: string;
      data?: T;
}

interface LoginResponse {
      token: string;
}

interface ForgotPasswordResponse {
      recoverCode: string;
}


export async function handleVerification({
      requestKey,
      otp,
      type,
      onClose,
      router,
      setIsLoading,
      login,
}: VerificationParams) {
      setIsLoading(true);

      try {
            const body = {
                  requestKey,
                  secretValue: otp,
            };

            // register
            if (type === "register") {
                  const response = await apiService.post<ApiResponse>("/v1/auth/user/verification", body);
                  if (response.success) {
                        toast.success("Akun berhasil dibuat. silahkan login");
                        onClose();
                        router.push("/auth/login");
                  } else {
                        throw new Error(response.message || "Verifikasi gagal");
                  }
            }

            // login
            else if (type === "login") {
                  const response = await apiService.post<ApiResponse<LoginResponse>>("/v1/auth/login/verification", body);
                  if (response.success && response.data) {
                        const token = response.data.token;
                        if (login) {
                              login(token); // Panggil fungsi login dari AuthContext
                        }
                        toast.success("Berhasil login");
                        onClose();
                        router.push("/");
                  } else {
                        throw new Error(response.message || "Verifikasi gagal");
                  }
            }

            // forgot password
            else if (type === "forgot-password") {
                  const response = await apiService.post<ApiResponse<ForgotPasswordResponse>>("/v1/auth/forgot-password/verification", body);

                  if (!response.success) throw new Error(response.message || "Verifikasi gagal");

                  const recoverCode = response.data?.recoverCode;
                  if (!recoverCode) throw new Error("Recover Code tidak ditemukan");

                  router.push(`/auth/reset-password?recoverCode=${encodeURIComponent(recoverCode)}`);
            }


      } catch (error: unknown) {
            console.error("Error during verification:", error);

            let errorMessage = "Terjadi kesalahan saat verifikasi";
            if (error instanceof Error) {
                  errorMessage = error.message;
            }

            alert(errorMessage);
      } finally {
            setIsLoading(false);
      }
}
