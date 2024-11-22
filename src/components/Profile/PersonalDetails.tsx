import Image from "next/image";

type PersonalDetailsType = {
      title: string;
      value: string;
}

const PersonalDetailsItem: PersonalDetailsType[] = [
      { title: 'Nama', value: 'Martin Paes' },
      { title: 'Tanggal Lahir', value: '6 November 1995' },
      { title: 'Jenis Kelamin', value: 'Laki - laki' },
]

export function PersonalDetails() {
      return (
            <div className="flex flex-col gap-5 ">
                  <div className="inline-flex gap-4">
                        <h4 className="text-lg font-extrabold text-neutral-700">Biodata Diri</h4>
                        <div className="inline-flex gap-2 items-center">
                              <Image src="/image/profile/edit.svg" alt="edit-icon" width={20} height={20} className="w-5" />
                              <p className="text-sm text-primary-500 font-bold">Ubah</p>
                        </div>
                  </div>
                  <div className="flex flex-col gap-5">
                        {PersonalDetailsItem.map((item, index) => (
                              <div className="flex flex-row text-neutral-700 text-sm gap-[20px]" key={index}>
                                    <p className="w-[150px]">{item.title}</p>
                                    <p>{item.value}</p>
                              </div>
                        ))}
                  </div>
                 
            </div>
      )
}