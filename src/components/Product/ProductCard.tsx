import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  ratings: string;
  sold: string;
}

export function ProductCard({ image, title, price, location, ratings, sold }: ProductCardProps) {
  return (
    <div className="flex flex-col shadow-card rounded-lg">
      <div className="w-full">
        <Image src={image} alt={title} width={170} height={170} className="w-full h-auto" />
      </div>

      <div className="flex flex-col p-3 gap-2">
        <h5 className="text-sm text-neutral-700">{title}</h5>
        <p className="font-bold text-neutral-700">{price}</p>

        <div className="flex items-center gap-2">
          <Image src="/image/product/icon/location-icon.svg" alt="location icon" width={16} height={16} />
          <p className="text-sm text-neutral-700">{location}</p>
        </div>

        <div className="flex items-start text-xs text-neutral-500 gap-1">
          <Image src="/image/product/icon/star-icon.svg" alt="star icon" width={16} height={16} />
          <p>{ratings}</p>
          <span>•</span>
          <p>{sold}</p>
        </div>
      </div>
    </div>
  );
}
