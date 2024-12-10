interface ProductDetailsBarProps {
      infoProductDetails: string[];
      activeInfoProductDetails: string;
      onTabClick: (category: string) => void;
}

export function ProductDetailsBar({ infoProductDetails, activeInfoProductDetails, onTabClick }: ProductDetailsBarProps) {
      return (
            <div className="flex flex-col overflow-hidden w-full">
                  <div className="h-[1px] w-full bg-neutral-400"></div>
                  <div className="flex flex-row w-full justify-center">
                        {infoProductDetails.map((item) => (
                              <button
                                    key={item}
                                    className={`text-sm whitespace-nowrap px-20 ${activeInfoProductDetails === item ? 'border-b-[3px] border-primary-500 text-primary-500 font-semibold py-5' : 'text-neutral-700 font-normal'}}`}
                                    onClick={() => onTabClick(item)}
                              >
                                    <p className="py-2">{item}</p>
                              </button>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400"></div>
                  <div className="h-[1px] w-full bg-neutral-400 "></div>
            </div>
      )
}