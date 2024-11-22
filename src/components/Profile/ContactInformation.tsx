import Image from "next/image";

type ContactInformationType = {
      title: string;
      value: string;
      onClick?: string;
}

const ContactInformationItem: ContactInformationType[] = [
      { title: 'Nomor HP', value: '123456789' },
      { title: 'Email', value: 'martinpaes@email.com' },
]

export function ContactInformation() {
      return (
            <div className="flex flex-col gap-5">
                  <h4 className="text-lg font-extrabold text-neutral-700">Kontak</h4>
                  <div className="flex flex-col gap-5">
                        {ContactInformationItem.map((item, index) => (
                              <div className="flex flex-row text-neutral-700 text-sm gap-[20px]" key={index}>
                                    <p className="w-[150px]">{item.title}</p>
                                    <p>{item.value}</p>
                                    <div className="inline-flex gap-2 items-center">
                                          <Image src="/image/profile/edit.svg" alt="edit-icon" width={20} height={20} className="w-5" />
                                          <p className="text-sm text-primary-500 font-bold">Ubah</p>
                                    </div>
                              </div>
                        ))}
                  </div>
                  <button className="bg-transparent border border-neutral-400 rounded-3xl py-3 w-fit px-10 font-semibold text-sm">Ubah Kata Sandi</button>
            </div>
      )
}