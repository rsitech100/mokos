'use client';
import { useState } from "react";
import { ContentTos } from "@/components/TermsofService/ContentTos";
import { SidebarTos } from "@/components/TermsofService/SidebarTos";

// Tentukan tipe untuk kunci yang valid
type ContentKey = 'Content 1' | 'Content 2' | 'Content 3' | 'Content 4';

export default function TermsOfServicePage() {
  const [activeBar, setActiveBar] = useState<ContentKey>('Content 1');

  const contentMap: Record<ContentKey, JSX.Element> = {
    'Content 1': <ContentTos />,
    'Content 2': <ContentTos />,
    'Content 3': <ContentTos />,
    'Content 4': <ContentTos />,
  };

  return (
    <main className="flex flex-col md:flex-row gap-6 md:gap-[45px] py-10 px-5 lg:px-20 max-w-[1440px] w-full mx-auto">
      <SidebarTos activeBar={activeBar} onTabClick={setActiveBar} />
      {contentMap[activeBar]}
    </main>
  );
}

