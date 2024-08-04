"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type IProps = {
  children: ReactNode;
};
const AuthProvider: FC<IProps> = (props) => {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
