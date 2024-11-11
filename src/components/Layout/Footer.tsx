import Image from "next/image";

const menus = [
  {
    title: "Menu 1",
    subMenus: ["Sub Menu 1", "Sub Menu 1", "Sub Menu 1", "Sub Menu 1"],
  },
  {
    title: "Menu 2",
    subMenus: ["Sub Menu 2", "Sub Menu 2", "Sub Menu 2", "Sub Menu 2"],
  },
  {
    title: "Menu 3",
    subMenus: ["Sub Menu 3", "Sub Menu 3", "Sub Menu 3", "Sub Menu 3"],
  },
];

export function Footer() {
  return (
    <footer className="border border-t-neutral-400">
      <div className="flex flex-col lg:flex-row justify-between px-20 py-12 max-w-[1440px] w-full mx-auto gap-10 lg:gap-0">
        <div className="flex flex-col max-w-[325px] gap-5">
          <Image
            src="/image/nav/profile-dummy.svg"
            alt="profile-dummy"
            width={48}
            height={48}
      />
      <p className="text-sm text-neutral-700">
            Lorem ipsum dolor sit amet consectetur. Lacinia ut consequat lacus
            donec vel. Vitae non mauris turpis nisl lectus morbi. Orci duis sit
            sed nibh ornare aliquam scelerisque nisl sed. Vitae amet tincidunt
            consectetur morbi.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
          {menus.map((menu, index) => (
            <div key={index} className="flex flex-col text-neutral-700 gap-3 w-[180px]">
              <p className="text-base font-extrabold">{menu.title}</p>
              <ul className="text-sm leading-snug space-y-2">
                {menu.subMenus.map((subMenu, subIndex) => (
                  <li key={subIndex}>{subMenu}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
