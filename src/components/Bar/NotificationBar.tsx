interface NotificationBarProps  {
      notifications: string[];
      activeNotification: string;
      onTabClick: (notification: string) => void;
  }
  
export function NotificationBar({notifications, activeNotification, onTabClick}: NotificationBarProps) {
      return (
            <div className="flex flex-col overflow-hidden w-full md:w-fit">
                  <div className="flex flex-row w-full justify-evenly">
                        {notifications.map((notification) => (
                              <button
                              key={notification}
                              className={`text-sm whitespace-nowrap px-10 ${activeNotification === notification ? 'border-b-[3px] border-primary-500 text-primary-500 font-semibold py-5' : 'text-neutral-700 font-normal'}}`}
                              onClick={() => onTabClick(notification)}
                              >
                                    <p className="pb-2">{notification}</p>
                              </button>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400 "></div>
            </div>
      )
}