import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface ReviewCardProps {
      name: string;
      rating: number;
      date: string;
      reviewText: string;
      images: string[];
};

export function ReviewCard({ name, rating, date, reviewText, images }: ReviewCardProps) {
      return (
            <div className="flex flex-row gap-4 border-b border-b-neutral-400 p-4">
                  <div className="rounded-full w-10 h-10">
                        <Image src="/image/review/profile-dummy.svg" alt="profile-dummy" width={40} height={40} className="w-full h-auto" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                        <div className="inline-flex gap-[5px]">
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <p className="font-bold text-xs sm:text-sm text-neutral-700">{rating}</p>
                        </div>

                        <div className="inline-flex gap-2 items-center text-xs sm:text-sm">
                              <p className="font-semibold text-neutral-700">{name}</p>
                              <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                              <p className="text-neutral-600">{date}</p>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-700">{reviewText}</p>

                        <div className="inline-flex gap-2 mt-5">
                              {images.map((item, index) => (
                                    <Image
                                          key={index} 
                                          src={item}
                                          alt="shoes-dummy"
                                          width={64}
                                          height={61}
                                          className="rounded-[12px]"
                                    />
                              ))}
                        </div>

                  </div>
            </div>
      )
}