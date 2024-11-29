import { useEffect, useState } from "react";
import { fetchKecamatan } from "@/lib/api/fetchKecamatan";
import { DropdownTemplate } from "./Address/DropdownTemplate";

export default function DropdownKecamatan() {
      const [kecamatan, setKecamatan] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  const data = await fetchKecamatan();
                  // console.log("Data Kecamatan:", data); // Debug untuk memastikan data sesuai
                  setKecamatan(data);
            }

            loadData();
      }, []);

      return (
            <DropdownTemplate
                  label="Kecamatan"
                  placeholder="Pilih Kecamatan"
                  options={kecamatan}
            />
      );
}
