"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { HoveredLink, Menu, MenuItem } from "../../ui/navbar-menu";
import { cn } from "@/utils/cn";
import { ThemeToggler } from "@/components/themeToggler";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import {
setIsReduxPrivate, setIsReduxAdmin
} from "@/redux/features/counterSlice";
export function Nav() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [userInfo, setUserInfo] = useState<any>();
  const [isAdmin, setIsAdmin] = useState("false");
  const [isPrivate, setIsPrivate] = useState("false");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        if (session?.data?.user?.email) {
          const config:any={email:session?.data?.user?.email}
          const resp: any = await axios.post("/api/me", config);
          // console.log(resp.data?.data?.accessToken, "ourdata");

          if (resp.data?.data?.accessToken) {
              setUserInfo(resp?.data?.data);
          }
        }
      } catch (error) {
      }
    };
    fetchAccessToken();
  }, [session]);

  useEffect(()=>{
    if(userInfo?.isAdmin=="true"){
      setIsAdmin("true")
    }
    if(userInfo?.isPrivate=="true"){
      setIsPrivate("true");
    }
  },[userInfo])
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Privacy">
          <div>{isPrivate?"Right now your profile is private":"Right now your profile is public"}</div>
          <div className="flex flex-col space-y-8 text-sm mb-0 pb-0 pt-0 mt-0">
            {isPrivate?
            <HoveredLink
            onClick={async()=>{
              setIsPrivate("false");
              dispatch(setIsReduxPrivate("false"));
              await axios.patch("/api/update", {...userInfo, isPrivate: "false"});
            }}
            >Make Public ?</HoveredLink>:
            <HoveredLink
            onClick={async()=>{
              setIsPrivate("true");
              dispatch(setIsReduxPrivate("true"));
              await axios.patch("/api/update", {...userInfo, isPrivate: "true"});
            }}
            >Make Private ?</HoveredLink>}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Admin">
        <div>{isAdmin?"Right now you are Admin":"Right now you are not Admin"}</div>
          <div className="flex flex-col space-y-4 text-sm">
            {isAdmin?<HoveredLink
              onClick={async()=>{
                setIsAdmin("false");
                dispatch(setIsReduxAdmin("false"));
                await axios.patch("/api/update", {...userInfo, isAdmin: "false"});
              }}
            >Undo Admin ?</HoveredLink>:
            <HoveredLink
            onClick={async()=>{
              setIsAdmin("true");
              dispatch(setIsReduxAdmin("true"));
              await axios.patch("/api/update", {...userInfo, isAdmin: "true"});
            }}
            >Make yourself Admin ?</HoveredLink>}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Logout">
          <div className="flex flex-col space-y-4 text-sm">
             <HoveredLink onClick={()=>{
              signOut();
             }}>Click to Logout</HoveredLink>
          </div>
        </MenuItem>
        <div className="absolute top-[15px] right-[25px]">
          <ThemeToggler />  
        </div>
        
      </Menu>
    </div>
  );
}
