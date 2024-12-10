import { FaStar } from "react-icons/fa6";

type ReviewBarType = {
      id: number;
      label: string;
      active?: boolean;
}

const ReviewBarItem: ReviewBarType[] = [
      { id: 1, label: 'Semua' },
      { id: 2, label: '5 (10)' },
      { id: 3, label: '4 (10)' },
      { id: 4, label: '3 (10)' },
      { id: 5, label: '2 (10)' },
      { id: 6, label: '1 (10)' },
]
export function ReviewBar() {
      return (
            <div className="flex flex-row justify-between border rounded-xl border-neutral-400 p-6">
                  <div className="inline-flex gap-2 items-center">
                        <FaStar color="#FFAB0D" size={24} />
                        <p className="font-extrabold text-[32px] text-neutral-700">
                              4.9
                              <span className="font-semibold text-sm">/5.0</span>
                        </p>
                  </div>
                  <div className="inline-flex gap-3">
                        {ReviewBarItem.map((item) => (
                              <div className="inline-flex border border-neutral-400 px-4 py-2 rounded-2xl gap-1 items-center cursor-pointer" key={item.id}>
                                    <FaStar color="#FFAB0D" size={20} />
                                    {item.label}
                              </div>
                        ))}
                  </div>
            </div>
      )
}