import React, { useEffect, useState } from "react";
import { fetchKecamatan } from "@/lib/api/fetch-kecamatan";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownKecamatanProps {
      kabupatenId: string | null; // ID Kabupaten untuk fetch data
      onChange: (value: string, label: string) => void;
      initialValue?: string | null; // Nilai awal
}

export function DropdownKecamatan({ kabupatenId, onChange, initialValue }: DropdownKecamatanProps) {
      const [kecamatan, setKecamatan] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  if (kabupatenId) {
                        const data = await fetchKecamatan(kabupatenId); 
                        setKecamatan(data);
                  }
            }

            loadData();
      }, [kabupatenId]);

      return (
            <DropdownTemplate
                  label="Kecamatan"
                  placeholder="Pilih Kecamatan"
                  options={kecamatan}
                  onChange={onChange}
                  initialValue={initialValue}
            />
      );
}
