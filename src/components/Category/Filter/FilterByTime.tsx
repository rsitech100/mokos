import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"


export function FilterByTime() {
      return (
            <div className="hidden lg:flex flex-row items-center gap-3">
                  <p className="text-sm font-semibold text-neutral-700">Urutkan</p>
                  <Select>
                        <SelectTrigger className="w-[147px] border border-neutral-600 rounded-lg">
                              <SelectValue placeholder="Terbaru" />
                        </SelectTrigger>
                        <SelectContent>
                              <SelectGroup>
                                    <SelectItem value="terbaru">Terbaru</SelectItem>
                                    <SelectItem value="harga-tertinggi">Harga Tertinggi</SelectItem>
                                    <SelectItem value="harga-terrendah">Harga Terrendah</SelectItem>
                              </SelectGroup>
                        </SelectContent>
                  </Select>
            </div>
      )
}