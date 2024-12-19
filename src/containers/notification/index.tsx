'use client';
import { useState } from "react";
import { NotificationBar } from "@/components/Bar/NotificationBar";
import { NotificationEmpty } from "@/components/Notification/NotificationEmpty";
import { NotificationItems } from "@/lib/notification-data";
// import { NotificationDate } from "@/components/Notification/NotificationDate";
import { NotificationList } from "@/components/Notification/NotificationList";

export function NotificationSection() {
      const [activeNotification, setActiveNotification] = useState<string>('Semua');
      const notifications = Object.keys(NotificationItems);

      const handleTabClick = (notification: string) => {
            setActiveNotification(notification);
      }

      return (
            <section className="flex flex-col gap-6 w-full shadow-none md:shadow-md px-0 py-6 md:p-6">
                  <NotificationBar notifications={notifications} activeNotification={activeNotification} onTabClick={handleTabClick} />
                  <NotificationEmpty />
                  {/* today */}
                  <div className="flex flex-col gap-5">
                        <p className="text-sm text-neutral-600">Today</p>
                        <NotificationList notifications={NotificationItems[activeNotification] || []} />
                  </div>
                  <hr className="border border-neutral-400 w-full h-[1px]" />
                  {/* 4 november 2024 */}
                  <div className="flex flex-col gap-5">
                        <p className="text-sm text-neutral-600">4 Nov 2024</p>
                        <NotificationList notifications={NotificationItems[activeNotification] || []} />
                  </div>
            </section>
      )
}