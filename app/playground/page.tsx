"use client";
import StickyScrollReveal from "@/components/dashboard/cardScroler/CardScroller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  const router = useRouter();
  const count = useAppSelector((state: any) => state.counterReducer.count);
  const name = useAppSelector((state: any) => state.counterReducer.name);
  const dispatch = useAppDispatch();

  const session = useSession();
  useEffect(()=>{
    console.log(session, "session");
  },[session])
  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     try {
  //       if (session?.data?.user?.email) {
  //         const config:any={email:session?.data?.user?.email}
  //         const resp: any = await axios.post("/api/me", config);
  //         console.log(resp.data?.data?.accessToken, "ourdata");

  //         if (resp.data?.data?.accessToken) {
  //           const newResp: any = await axios.post("/api/getAllUsers",{email: resp.data?.data?.email});
  //           console.log(newResp,"newResp");
  //             setLoading(false);
  //         } else{
  //           signOut();
  //           router.push("/");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error verifying access token:", error);
  //       signOut();
  //       router.push("/");
  //     }
  //   };
  //   fetchAccessToken();
  // }, [session, router]);
  const loadingStates = [
    {
      text: "Loading Google form",
    },
    {
      text: "Almost done",
    },
    {
      text: "Let us see you at new space",
    }
  ];
  // if(loading){
  //   return (<Loader loadingStates={loadingStates} loading={loading} duration={800} />)
  // }
  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      <StickyScrollReveal />
    </main>
  );
}
