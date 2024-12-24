import React, { useEffect, useState } from "react";
import { fetchKodePos } from "@/lib/api/fetch-kodepos";
import { DropdownTemplate } from "./Address/DropdownTemplate";

interface DropdownKodePosProps {
      kabupatenId: string | null;
      kecamatanId: string | null;
      onChange: (value: string) => void;
}

export default function DropdownKodePos({kabupatenId, kecamatanId, onChange}: DropdownKodePosProps) {
      const [kodePos, setKodePos] = useState<{ value: string; label: string }[]>([]);

      useEffect(() => {
            async function loadData() {
                if (kabupatenId && kecamatanId) {
                    const data = await fetchKodePos({ kabupatenId, kecamatanId });
                    setKodePos(data);
                } else {
                    setKodePos([]); // Reset dropdown jika kabupatenId atau kecamatanId tidak valid
                }
            }
        
            loadData();
        }, [kabupatenId, kecamatanId]);
        

      return (
            <DropdownTemplate
                  label="Kode Pos"
                  placeholder="Pilih Kode Pos"
                  options={kodePos}
                  onChange={onChange}
            />
      );
}
