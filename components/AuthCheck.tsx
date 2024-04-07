"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const AuthCheck = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "unauthenticated" && pathname !== "/") {
    router.push("/");
    return <></>;
  } else if(status === "authenticated" && pathname === "/"){
    router.push("/dashboard");
    return <></>
  }
  else return <>{children}</>;
};
export default AuthCheck;
