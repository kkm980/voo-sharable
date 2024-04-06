import MeteorsForm from "@/components/signupForm";
import { ThemeToggler } from "@/components/themeToggler";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MeteorsForm />
    </main>
  );
}
