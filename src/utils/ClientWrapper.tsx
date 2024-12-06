"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Sidebar } from "@/components/Layout/Sidebar/Sidebar";

export default function ClientWrapper({
      children,
}: Readonly<{ children: React.ReactNode }>) {
      const pathname = usePathname();

      if (pathname === "/profile" || pathname === "/address" || pathname === "/order" || pathname === "/notification" || pathname.startsWith("/order/order-details")) {
            return (
                  <>
                        <Navbar />
                        <main className="flex flex-row max-w-[1440px] w-full p-5 lg:pt-12 lg:py-[120px] lg:px-20 mx-auto gap-10">
                              <Sidebar />
                              {children}
                        </main>
                        <Footer />
                  </>
            );
      }

      return (
            <>
                  <Navbar />
                  {children}
                  <Footer />
            </>
      );
}
