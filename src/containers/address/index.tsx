'use client';
import { useState } from "react";
import { AddressList } from "@/components/Address/AddressList";
import { AddAddressButton } from "@/components/Buttons/AddAddressButton";
import { SearchAddressButton } from "@/components/Buttons/SearchAddressButton";

export function AddressSection() {
      const [refreshKey, setRefreshKey] = useState(0);
      const [searchQuery, setSearchQuery] = useState("");

      const handleAddressAdded = () => {
            setRefreshKey(prev => prev + 1);
      };

      const handleSearch = (query: string) => {
            setSearchQuery(query);
      };

      return (
            <div className="flex flex-col shadow-md p-6 rounded-lg w-full gap-6">
                  <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                        <AddAddressButton onSuccess={handleAddressAdded} />
                        <SearchAddressButton onSearch={handleSearch} />
                  </div>
                  <AddressList refresh={refreshKey} searchQuery={searchQuery} />
            </div>
      )
}