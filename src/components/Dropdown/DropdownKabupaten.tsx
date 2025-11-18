import React, { useEffect, useState } from "react";
import { fetchKabupatenKota } from "@/lib/api/fetch-kabupaten";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownKabupatenProps {
      provinsiId: string | null; // ID Provinsi untuk fetch data
      onChange: (value: string, label: string) => void;
      initialValue?: string | null; // Nilai awal
}


export function DropdownKabupaten({ provinsiId, onChange, initialValue }: DropdownKabupatenProps) {
      const [kabupaten, setKabupaten] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  if (provinsiId) {
                        const data = await fetchKabupatenKota(provinsiId); // Fetch data berdasarkan provinsiId
                        setKabupaten(data);
                  }
            }

            loadData();
      }, [provinsiId]);

      return (
            <DropdownTemplate
                  label="Kabupaten"
                  placeholder="Pilih Kabupaten"
                  options={kabupaten}
                  onChange={onChange}
                  initialValue={initialValue}
            />
      );
}
