// components/Dropdown.tsx
import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";

interface DropdownProps {
      label: string;
      placeholder: string;
      options: { value: string; label: string }[]; // Array untuk opsi dropdown
      onChange?: (value: string) => void; // Callback opsional
}

export function DropdownTemplate({ label, placeholder, options, onChange }: DropdownProps) {
      return (
            <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-700 font-bold">{label}</label>
                  <Select onValueChange={onChange}> 
                        <SelectTrigger className="w-full border border-neutral-400 rounded-lg text-neutral-700">
                              <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                              <SelectGroup>
                                    {Array.isArray(options) && options.length > 0 ? (
                                          options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                      {option.label}
                                                </SelectItem>
                                          ))
                                    ) : (
                                          <div className="p-2 text-sm text-neutral-500">
                                                Tidak ada data tersedia
                                          </div>
                                    )}
                              </SelectGroup>
                        </SelectContent>
                  </Select>
            </div>
      );
}
