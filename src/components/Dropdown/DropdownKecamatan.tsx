import React, { useEffect, useState } from "react";
import { fetchKecamatan } from "@/lib/api/fetch-kecamatan";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownKecamatanProps {
      kabupatenId: string | null; // ID Kabupaten untuk fetch data
      onChange: (value: string) => void;
}

export function DropdownKecamatan({ kabupatenId, onChange }: DropdownKecamatanProps) {
      const [kecamatan, setKecamatan] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  if (kabupatenId) {
                        const data = await fetchKecamatan(kabupatenId); // Fetch data berdasarkan kabupatenId
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
            />
      );
}
