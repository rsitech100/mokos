import { InfoProductType } from "@/types/info-product"

interface ProductDetailsDescriptionProps {
      infoProductDetails: InfoProductType[];
}

export function ProductDetailsDescription({infoProductDetails}: ProductDetailsDescriptionProps) {
      return (
            <div className="">
                  {infoProductDetails.map((item) => (
                        <p className="text-sm" key={item.id}>{item.description}</p>
                  ))}
            </div>
      )
}