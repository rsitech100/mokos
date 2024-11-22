import { ContactInformation } from "./ContactInformation";
import { PersonalDetails } from "./PersonalDetails";
import { UploadPhoto } from "./UploadPhoto";

export function ProfileCard() {
      return (
            <div className="inline-flex shadow-md rounded-lg w-full justify-start gap-[50px] p-6">
                  <UploadPhoto />
                  <div className="flex flex-col gap-8">
                        <PersonalDetails />
                        <div className="border-t-[1px] border-dashed border-neutral-400"></div>
                        <ContactInformation />
                  </div>
            </div>
      )
}