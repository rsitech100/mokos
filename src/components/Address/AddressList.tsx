'use client';
import { useState, useEffect } from "react";
import { AddressCard } from "./AddressCard";
import { fetchAddressList, AddressData } from "@/lib/api/fetch-address";
import { AddressEmpty } from "./AddressEmpty";

interface AddressListProps {
      refresh?: number;
      searchQuery?: string;
}

export function AddressList({ refresh, searchQuery }: AddressListProps) {
      const [addresses, setAddresses] = useState<AddressData[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            loadAddresses();
      }, [refresh]);

      const loadAddresses = async () => {
            try {
                  setLoading(true);
                  const response = await fetchAddressList();
                  if (response.success) {
                        const sorted = [...response.data].sort((a, b) => {
                              return (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0);
                        });
                        setAddresses(sorted);
                  }

            } catch (error) {
                  console.error('Error loading addresses:', error);
            } finally {
                  setLoading(false);
            }
      };

      // Filter addresses based on search query
      const filteredAddresses = addresses.filter((item) => {
            if (!searchQuery || searchQuery.trim() === '') return true;
            
            const query = searchQuery.toLowerCase();
            const searchableText = [
                  item.label,
                  item.receiveName,
                  item.phone,
                  item.street,
                  item.region?.districtName,
                  item.region?.cityName,
                  item.region?.provinceName,
                  item.region?.postalCode,
            ].filter(Boolean).join(' ').toLowerCase();
            
            return searchableText.includes(query);
      });

      if (loading) {
            return (
                  <div className="flex flex-col gap-4">
                        {[...Array(3)].map((_, i) => (
                              <div key={i} className="animate-pulse">
                                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                              </div>
                        ))}
                  </div>
            );
      }

      if (filteredAddresses.length === 0) {
            return searchQuery ? (
                  <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-neutral-500 text-sm">Alamat tidak ditemukan</p>
                        <p className="text-neutral-400 text-xs mt-1">Coba kata kunci lain</p>
                  </div>
            ) : <AddressEmpty />;
      }

      return (
            <div className="flex flex-col gap-4">
                  {filteredAddresses.map((item) => {
                        const addressString = item.region
                              ? `${item.street}, ${item.region.districtName || ''}, ${item.region.cityName || ''}, ${item.region.provinceName || ''}, ${item.region.postalCode || ''}`
                              : item.street;

                        return (
                              <AddressCard
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    name={item.receiveName}
                                    telephone={item.phone}
                                    address={addressString}
                                    isPrimary={item.isPrimary}
                                    addressData={item}
                                    onDelete={() => loadAddresses()}
                                    onUpdate={() => loadAddresses()}
                              />
                        );
                  })}
            </div>
      )
}