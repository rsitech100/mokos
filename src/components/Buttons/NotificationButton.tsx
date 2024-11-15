import Image from "next/image";

export function NotificationButton() {
      return (
            <div className="cursor-pointer w-6 h-6">
                  <Image src="/image/nav/notification-icon.svg" alt="notification-icon" width={24} height={24} className="w-6 cursor-pointer" />
            </div>
      )
}