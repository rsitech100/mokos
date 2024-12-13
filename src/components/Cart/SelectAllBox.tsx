interface SelectAllBoxProps {
      count: number;
}

export function SelectAllBox({count}: SelectAllBoxProps) {
      return (
            <div className="w-full bg-neutral-100 shadow-md rounded-[12px] p-5 gap-1.5 inline-flex">
                  <input type="checkbox" className="w-5 h-5"/>
                  <p className="text-xs sm:text-sm text-neutral-700">Pilih Semua
                        (
                        <span className="font-extrabold">
                              {count}
                        </span>
                        )
                  </p>
            </div>
      )
}