'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardSkeleton } from "../Skeleton/ProductCardSkeleton";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  location: string;
  ratings: number;
  sold: number;
}

export function ProductCard({ id, image, title, price, location, ratings, sold }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  // Format price to Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Link href={`/detail-product/${id}`} passHref>
      <div className="flex flex-col shadow-card rounded-lg">
        <div className="w-full relative" style={{ paddingBottom: '100%' }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            loading="lazy"
            unoptimized
          />
        </div>

        <div className="flex flex-col p-3 gap-2 bg-neutral-100">
          <h5 className="text-xs sm:text-sm text-neutral-700 line-clamp-2">{title}</h5>
          <p className="text-xs sm:text-sm font-bold text-neutral-700">{formattedPrice}</p>

          <div className="hidden items-center gap-2">
            <Image src="/image/product/icon/location-icon.svg" alt="location icon" width={16} height={16} />
            <p className="text-xs sm:text-sm text-neutral-700 truncate">{location}</p>
          </div>

          <div className="flex items-start text-xs text-neutral-500 gap-1">
            <Image src="/image/product/icon/star-icon.svg" alt="star icon" width={16} height={16} />
            <p>{ratings.toFixed(1)}</p>
            <span>•</span>
            <p>Terjual {sold}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
