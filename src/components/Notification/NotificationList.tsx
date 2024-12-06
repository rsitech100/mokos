import { NotificationType } from "@/types/notification";
import { NotificationCard } from "./NotificationCard";

interface NotificationItemProps {
      notifications: NotificationType[];
}

export function NotificationList({notifications}: NotificationItemProps) {
      return (
            <div className="flex flex-col gap-2">
                  {notifications.map((item) => (
                        <NotificationCard key={item.key} title={item.title} description={item.description} time={item.time} />
                  ))}
            </div>
      )
}