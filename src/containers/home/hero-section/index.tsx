"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import "swiper/css/pagination";
import Image from "next/image";
import { ImagesType } from "@/types/images";

const ImagesItem: ImagesType[] = [
      { image: '/image/home/hero-1.svg', alt: 'banner-hero-1' },
      { image: '/image/home/hero-2.svg', alt: 'banner-hero-2' },
      { image: '/image/home/hero-3.svg', alt: 'banner-hero-3' },
]

export function Hero() {
      return (
            <section className="px-5 lg:px-20 w-full h-[190px] sm:h-fit lg:h-[300px] flex items-center justify-center">
                  <Swiper
                        modules={[Autoplay, Pagination]}
                        pagination={{ clickable: true }}
                        autoplay={true}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="relative"
                        centeredSlides={true}
                  >
                        {ImagesItem.map((item) => (
                              <SwiperSlide key={item.alt} className="w-full !h-full object-contain">
                                    <Image
                                          src={item.image}
                                          alt={item.alt}
                                          width={100}
                                          height={100}
                                          className="rounded-2xl w-full h-full object-contain"
                                          loading="lazy"
                                    />
                              </SwiperSlide>
                        ))}
                  </Swiper>
            </section>

      )
}