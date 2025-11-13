import Image from "next/image";

interface InputSearchLocationProps {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputSearchLocation({
      value,
      onChange,
}: InputSearchLocationProps) {
      return (
            <div className="flex flex-row bg-transparent border border-neutral-400 rounded-xl gap-3 px-2 py-2 w-full">
                  <Image
                        src="/image/nav/search-icon.svg"
                        alt="search-icon"
                        width={16}
                        height={16}
                  />
                  <input
                        placeholder="Cari"
                        className="outline-none text-neutral-700 w-full text-sm"
                        value={value}
                        onChange={onChange}
                  />
            </div>
      );
}
