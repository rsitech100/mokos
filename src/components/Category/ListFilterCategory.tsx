import { SeeAllLocationButton } from "../Buttons/SeeAllLocationButton";
import { FilterByDelivery } from "./Filter/FilterByDelivery";
import { FilterByLocation } from "./Filter/FilterByLocation";
import { FilterByPrice } from "./Filter/FilterByPrice";

interface ListFilterCategoryProps {
      display?: string;
}

export function ListFilterCategory({display}: ListFilterCategoryProps) {
      return (
            <div className={`${display} flex-col gap-5 w-full`}>
                  <FilterByLocation />
                  <SeeAllLocationButton />
                  <div className="w-full bg-neutral-400 h-[0.5px]"></div>
                  <FilterByPrice />
                  <div className="w-full bg-neutral-400 h-[0.5px]"></div>
                  <FilterByDelivery />    
            </div>
      )
}