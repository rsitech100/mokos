import React, { useEffect, useState } from "react";
import { fetchProvinsi } from "@/lib/api/fetch-provinsi";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownProvinsiProps {
      onChange: (value: string, label: string) => void; // Callback untuk mengirim ID dan Nama Provinsi
      initialValue?: string | null; // Nilai awal
    }


export default function DropdownProvinsi({onChange, initialValue}: DropdownProvinsiProps) {
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
                  initialValue={initialValue}
            />
      );
}
