import React, { useEffect, useState } from "react";
import { fetchProvinsi } from "@/lib/api/fetch-provinsi";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownProvinsiProps {
      onChange: (value: string) => void; // Callback untuk mengirim ID Provinsi
    }


export default function DropdownProvinsi({onChange}: DropdownProvinsiProps) {
      const [provinsi, setProvinsi] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  const data = await fetchProvinsi();
                  // console.log("Data Provinsi:", data); // Debug untuk memastikan data sesuai
                  setProvinsi(data);
            }

            loadData();
      }, []);

      return (
            <DropdownTemplate
                  label="Provinsi"
                  placeholder="Pilih Provinsi"
                  options={provinsi}
                  onChange={onChange}
            />
      );
}
