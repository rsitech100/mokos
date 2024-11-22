import { ProfileItems } from "../Menu/Profile/ProfileItems";
import { UserProfile } from "../Menu/Profile/UserProfile";

export function Sidebar() {
      return (
            <div className="flex flex-col gap-5 w-[250px]">
                  <UserProfile />
                  <div className="border-t-[1px] border-dashed border-neutral-400"></div>
                  <div className="flex flex-col">
                        <ProfileItems />
                  </div>
            </div>
      )
}