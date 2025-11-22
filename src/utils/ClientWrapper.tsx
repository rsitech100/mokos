"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Sidebar } from "@/components/Layout/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
      const pathname = usePathname();
      const router = useRouter();
      const { isAuthenticated } = useAuth();

      // Cek apakah halaman merupakan public route
      const isPublicRoute = useMemo(
            () => pathname.startsWith("/auth") || ["/", "/category", "/detail-product"].includes(pathname),
            [pathname]
      );

      // Redirect ke login jika user tidak terautentikasi dan mengakses halaman private
      useEffect(() => {
            if (!isAuthenticated && !isPublicRoute) {
                  router.push("/auth/login");
            }
      }, [isAuthenticated, isPublicRoute, router]);

      // Tentukan background color berdasarkan halaman
      const bgNeutralPages = new Set(["/cart", "/checkout", "/pay", "/payment"]);
      const backgroundColor = bgNeutralPages.has(pathname) ? "bg-neutral-200" : "";

      // Cek apakah sidebar harus ditampilkan
      const shouldShowSidebar = useMemo(
            () =>
                  ["/profile", "/address", "/order", "/notification", "/review"].includes(pathname) ||
                  pathname.startsWith("/order/order-details"),
            [pathname]
      );

      return (
            <>
                  <Navbar />
                  <Toaster position="top-center" />
                  <main
                        className={` ${backgroundColor} ${shouldShowSidebar ? "flex flex-row p-5 lg:pt-12 lg:py-[120px] lg:px-20 gap-10" : ""
                              }`}
                  >
                        {shouldShowSidebar && <Sidebar />}
                        {children}
                  </main>
                  <Footer />
            </>
      );
}
