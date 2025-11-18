'use client';

import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { useProductDetail } from '@/context/ProductDetailContext';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function ProductDetailsImage() {
      const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
      const { product, loading } = useProductDetail();

      if (loading) {
            return (
                  <div className="flex flex-col items-center gap-4 justify-start w-full">
                        <div className="w-full md:max-w-[320px] h-[320px] bg-gray-300 animate-pulse rounded-[12px]"></div>
                        <div className="flex gap-2 w-full md:max-w-[320px]">
                              {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-[72px] h-[72px] bg-gray-300 animate-pulse rounded-lg"></div>
                              ))}
                        </div>
                  </div>
            );
      }

      if (!product || !product.pictureFiles || product.pictureFiles.length === 0) {
            return (
                  <div className="flex flex-col items-center gap-4 justify-start w-full">
                        <Image
                              src="/image/product/shoes-dummy.svg"
                              alt="No image"
                              className="w-full h-auto rounded-[12px]"
                              width={320}
                              height={320}
                        />
                  </div>
            );
      }

      const images = product.pictureFiles.map((file) => ({
            image: `${BASE_API}${file.uri}`,
            alt: file.name || product.title,
      }));

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
                        {images.map((item, index) => (
                              <SwiperSlide key={index}>
                                    <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                                          <Image
                                                src={item.image}
                                                alt={item.alt}
                                                fill
                                                className="object-cover rounded-[12px]"
                                                unoptimized
                                          />
                                    </div>
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
                        {images.map((item, index) => (
                              <SwiperSlide key={index}>
                                    <div className="relative w-[72px] h-[72px]">
                                          <Image
                                                src={item.image}
                                                alt={item.alt}
                                                fill
                                                className="cursor-pointer rounded-lg opacity-60 hover:opacity-100 transition-opacity object-cover"
                                                unoptimized
                                          />
                                    </div>
                              </SwiperSlide>
                        ))}
                  </Swiper>
            </div>
      );
}
