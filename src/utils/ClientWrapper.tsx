"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Sidebar } from "@/components/Layout/Sidebar/Sidebar";

export default function ClientWrapper({
      children,
}: Readonly<{ children: React.ReactNode }>) {
      const pathname = usePathname();

      if (pathname === "/profile" || pathname === "/address") {
            return (
                  <>
                        <Navbar />
                        <main className="flex flex-row max-w-[1440px] w-full mx-auto gap-10" style={{ padding: '48px 80px 120px 80px'}}>
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
