import React, { useEffect, useState } from "react";
import { fetchKodePos } from "@/lib/api/fetch-kodepos";
import { DropdownTemplate } from "./Address/DropdownTemplate";

export default function DropdownKodePos() {
      const [kodePos, setKodePos] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                  const data = await fetchKodePos();
                  // console.log("Data Kode Pos:", data); // Debug untuk memastikan data sesuai
                  setKodePos(data);
            }

            loadData();
      }, []);

      return (
            <DropdownTemplate
                  label="Kode Pos"
                  placeholder="Pilih Kode Pos"
                  options={kodePos}
            />
      );
}
