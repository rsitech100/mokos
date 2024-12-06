interface NotificationBarProps  {
      notifications: string[];
      activeNotification: string;
      onTabClick: (category: string) => void;
  }
  
export function NotificationBar({notifications, activeNotification, onTabClick}: NotificationBarProps) {
      return (
            <div className="flex flex-col overflow-hidden w-full md:w-fit">
                  <div className="flex flex-row w-full justify-evenly">
                        {notifications.map((item) => (
                              <button
                              key={item}
                              className={`text-sm whitespace-nowrap px-10 ${activeNotification === item ? 'border-b-[3px] border-primary-500 text-primary-500 font-semibold py-5' : 'text-neutral-700 font-normal'}}`}
                              onClick={() => onTabClick(item)}
                              >
                                    <p className="pb-2">{item}</p>
                              </button>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400 "></div>
            </div>
      )
}