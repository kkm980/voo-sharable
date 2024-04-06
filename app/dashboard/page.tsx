"use client";
import StickyScrollReveal from "@/components/dashboard/cardScroler/CardScroller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decrement,
  increment,
  reset,
  addName,
  setSupportingLangs,
  setLoading,
  setMultiLangInputListStore,
} from "@/redux/features/counterSlice";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const count = useAppSelector((state: any) => state.counterReducer.count);
  const name = useAppSelector((state: any) => state.counterReducer.name);
  const supportingLangs = useAppSelector(
    (state: any) => state.counterReducer.supportingLangs
  );
  const loading = useAppSelector((state: any) => state.counterReducer.loading);
  const multiLangInputListStore = useAppSelector(
    (state: any) => state.counterReducer.multiLangInputListStore
  );
  const dispatch = useAppDispatch();

  const session = useSession();
  console.log({ session });

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      <button onClick={() => signOut()}>sign out</button>
      <StickyScrollReveal />
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <h4 style={{ marginBottom: 16 }}>{name}</h4>
        <h4 style={{ marginBottom: 16 }}>{supportingLangs.length}..</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => {
            dispatch(decrement());
            dispatch(addName("shyam"));
            dispatch(setSupportingLangs("alpha"));
          }}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>
    </main>
  );
}
