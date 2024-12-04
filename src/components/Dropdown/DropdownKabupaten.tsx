import React, { useEffect, useState } from "react";
import { fetchKabupatenKota } from "@/lib/api/fetch-kabupaten";
import { DropdownTemplate } from "./Address/DropdownTemplate";

export default function DropdownKabupaten() {
      const [kabupaten, setKabupaten] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  const data = await fetchKabupatenKota();
                  // console.log("Data Kabupaten:", data); // Debug untuk memastikan data sesuai
                  setKabupaten(data);
            }

            loadData();
      }, []);

      return (
            <DropdownTemplate
                  label="Kabupaten"
                  placeholder="Pilih Kabupaten"
                  options={kabupaten}
            />
      );
}
