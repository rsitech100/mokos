interface ReviewBarProps {
      activeBar: string;
      onTabClick: (category: string) => void;
}

type BarItemType = {
      id: number;
      label: string;
}

const BarItem: BarItemType[] = [
      { id: 1, label: 'Belum Diulas' },
      { id: 2, label: 'Sudah Diulas' }
]


export function ReviewBar({ activeBar, onTabClick }: ReviewBarProps) {
      return (
            <div className="flex flex-col overflow-hidden w-full md:w-fit">
                  <div className="flex flex-row w-full justify-evenly">
                        {BarItem.map((bar) => (
                              <button
                                    key={bar.id}
                                    className={`text-sm whitespace-nowrap px-10 ${activeBar === bar.label
                                                ? 'border-b-[3px] border-primary-500 text-primary-500 font-semibold py-3'
                                                : 'text-neutral-700 font-normal'
                                          }`}
                                    onClick={() => onTabClick(bar.label)}
                              >
                                    <p>{bar.label}</p>
                              </button>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400 "></div>
            </div>
      )
}