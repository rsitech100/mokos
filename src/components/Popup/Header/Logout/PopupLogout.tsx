"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LogoutPopupProps {
      onClose: () => void;
}

export function LogoutPopup({ onClose }: LogoutPopupProps) {
      const { logout } = useAuth();
      const router = useRouter();

      const handleLogout = () => {
            logout(() => {
                  // Redirect ke login page setelah logout
                  router.push("/auth/login");
            });
            onClose();
      };

      return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-5">
                  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[412px]">
                        <p className="text-lg font-bold text-neutral-700">Keluar</p>
                        <p className="text-sm text-neutral-700 mt-2">Apakah kamu yakin ingin keluar?</p>
                        <div className="flex justify-end gap-3 mt-10">
                              <button
                                    className="px-12 py-2 bg-transparent border text-neutral-700 font-semibold border-neutral-400 rounded-3xl"
                                    onClick={onClose}
                              >
                                    Batal
                              </button>
                              <button
                                    className="px-12 py-2 bg-danger-200 text-white font-semibold rounded-3xl hover:bg-danger-300 transition-colors"
                                    onClick={handleLogout}
                              >
                                    Keluar
                              </button>
                        </div>
                  </div>
            </div>
      );
}
