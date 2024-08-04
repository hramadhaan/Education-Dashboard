"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  MessagesSquare,
  Bell,
  GraduationCap,
  School,
  ClipboardList,
  Calendar,
  User,
  Settings2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { useProfileStores } from "@/stores/UserStores";

type IProps = {};
const NavBar: FC<IProps> = (props) => {
  const profile = useProfileStores((state) => state.profile);
  return (
    <div className="w-full flex flex-row items-center justify-between py-4 px-2">
      <Input className="w-3/12" placeholder="Search..." />
      <div className="flex flex-row items-center gap-x-4">
        <div className="p-2 border rounded-sm cursor-pointer flex flex-row items-center gap-x-2">
          <GraduationCap color="#1f1f1f" />
          <p className="text-xs text-[#1f1f1f]">{profile.generation.name}</p>
        </div>
        <Button variant="outline" size={"icon"}>
          <MessagesSquare />
        </Button>
        <Button variant="outline" size={"icon"}>
          <Bell />
        </Button>
        <Separator orientation="vertical" color="border" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex flex-row items-center gap-x-2">
              <p className="text-xs text-primary font-medium">{`${profile.firstName} ${profile.lastName}`}</p>
              <Image
                width={40}
                height={40}
                src={
                  "https://avatars.githubusercontent.com/u/16558533?v=4&size=64"
                }
                alt="profile-image"
                className="rounded-full"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <School className="w-4 h-4 mr-2" />
                <span>Kelas Saya</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardList className="w-4 h-4 mr-2" />
                <span>Tugas Saya</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="w-4 h-4 mr-2" />
                <span>Jadwal Pelajaran Saya</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>Profil Saya</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 className="w-4 h-4 mr-2" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                signOut({
                  redirect: true,
                  callbackUrl: "/authentication/login",
                }).then((result) => {
                  alert("Logout");
                });
              }}
            >
              <span className="text-red-500 font-semibold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
