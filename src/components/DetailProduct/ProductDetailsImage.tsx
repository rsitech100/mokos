'use client';

import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import Image from 'next/image';

type ProductImageType = {
      image: string;
      alt: string;
};

const ProductImageItem: ProductImageType[] = [
      { image: '/image/detail-product/dummy-1.svg', alt: 'dummy-1' },
      { image: '/image/detail-product/dummy-2.svg', alt: 'dummy-2' },
      { image: '/image/detail-product/dummy-1.svg', alt: 'dummy-3' },
      { image: '/image/detail-product/dummy-2.svg', alt: 'dummy-4' },
      { image: '/image/detail-product/dummy-1.svg', alt: 'dummy-5' },
      { image: '/image/detail-product/dummy-2.svg', alt: 'dummy-6' },
];

export function ProductDetailsImage() {
      const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

      return (
            <div className="flex flex-col items-center gap-4 justify-start w-full">
                  {/* Slider Utama */}
                  <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Thumbs]}
                        slidesPerView={1}
                        className="main-slider w-full md:max-w-[320px]"
                  >
                        {ProductImageItem.map((item, index) => (
                              <SwiperSlide key={index}>
                                    <Image
                                          src={item.image}
                                          alt={item.alt}
                                          className="w-full h-auto rounded-[12px]"
                                          width={320}
                                          height={320}
                                    />
                              </SwiperSlide>
                        ))}
                  </Swiper>

                  {/* Slider Thumbnail */}
                  <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4.5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Thumbs]}
                        className="thumbnail-slider w-full md:max-w-[320px]"
                        breakpoints={{
                              390: {
                                    slidesPerView: 5
                              },
                              768: {
                                    slidesPerView: 4.5
                              }
                        }}
                  >
                        {ProductImageItem.map((item, index) => (
                              <SwiperSlide key={index}>
                                    <Image
                                          src={item.image}
                                          alt={item.alt}
                                          width={72}
                                          height={72}
                                          className="cursor-pointer rounded-lg opacity-60 hover:opacity-100 transition-opacity"
                                    />
                              </SwiperSlide>
                        ))}
                  </Swiper>
            </div>
      );
}
