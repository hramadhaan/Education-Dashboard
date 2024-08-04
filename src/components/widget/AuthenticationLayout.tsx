"use client";

import { FC, ReactNode } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { getProfile } from "@/hooks/useProfile";

type IProps = {
  children: ReactNode;
};
const AuthenticationLayout: FC<IProps> = (props) => {
  const { children } = props;

  const { data, status, isLoading } = getProfile();

  if (status === "loading" || isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  console.log("Data", data);

  return (
    <div className="w-full min-h-screen flex flex-row items-start justify-start">
      <SideBar />
      <div className="flex w-full items-start justify-start flex-col">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
