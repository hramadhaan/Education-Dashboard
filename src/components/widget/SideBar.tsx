"use client";

import Image from "next/image";
import { FC, memo, useMemo } from "react";
import { Separator } from "../ui/separator";
import {
  HomeIcon,
  UniversityIcon,
  BookIcon,
  CalendarIcon,
  MessageCircleIcon,
  BellIcon,
  SettingsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type IProps = {};
type ISideBarItemProps = {
  title: string;
  icon?: JSX.Element;
  trailing?: JSX.Element;
  route: string;
};

const SideBarItem: FC<ISideBarItemProps> = memo((props) => {
  const { title, icon, trailing, route } = props;
  const pathname = usePathname();
  console.log("Pathname: ", pathname);
  const isActivePage = useMemo(() => {
    return pathname === route;
  }, [pathname]);
  return (
    <Link href={route}>
      <div
        className={cn(
          "p-3 flex flex-row items-center justify-between rounded-md cursor-pointer transition-all hover:bg-slate-100",
          isActivePage && "bg-slate-100"
        )}
      >
        <div className="gap-x-3 flex flex-row items-center">
          {icon}
          <p className="text-xs font-medium text-zinc-700">{title}</p>
        </div>
        {trailing}
      </div>
    </Link>
  );
});
const SideBar: FC<IProps> = (props) => {
  return (
    <div className="w-3/12 h-screen overflow-y-scroll scroll-without-scrollbar">
      <div className="flex flex-col py-3">
        <div className="flex flex-row items-center">
          <Image
            src={"/icons/primary-icon.png"}
            width={60}
            height={30}
            alt="Education Icons"
          />
          <p className="text-xs font-bold text-primaryColor">Admin Panel</p>
        </div>
        <div className="flex flex-col gap-y-2 py-4 px-2">
          <SideBarItem
            title={"Dashboard"}
            icon={<HomeIcon className="w-4 h-4" />}
            route="/"
          />
          <SideBarItem
            title={"Kelas"}
            icon={<UniversityIcon className="w-4 h-4" />}
            route="/kelas"
          />
          <SideBarItem
            title={"Tugas"}
            icon={<BookIcon className="w-4 h-4" />}
            trailing={
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">2</span>
              </div>
            }
            route="/tugas"
          />
          <SideBarItem
            title={"Jadwal Pelajaran"}
            icon={<CalendarIcon className="w-4 h-4" />}
            trailing={
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">2</span>
              </div>
            }
            route="/jadwal-pelajaran"
          />
          <Separator />
          <SideBarItem
            title="Pesan"
            icon={<MessageCircleIcon className="w-4 h-4" />}
            trailing={
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">9+</span>
              </div>
            }
            route="/chat"
          />
          <Separator />
          <SideBarItem
            title="Notifikasi"
            icon={<BellIcon className="w-4 h-4" />}
            trailing={
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">2</span>
              </div>
            }
            route="/notifikasi"
          />
          <SideBarItem
            title="Pengaturan"
            icon={<SettingsIcon className="w-4 h-4" />}
            route="/pengaturan"
          />
        </div>
      </div>
    </div>
  );
};

const SideBarMemoize = memo(SideBar);

export default SideBarMemoize;
