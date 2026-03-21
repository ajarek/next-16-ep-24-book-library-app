
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start ">
    <div className="relative w-full h-[670px]">
      <Image src="/hero.jpg" alt="Hero" fill className="w-full h-full object-cover" loading="eager" priority sizes="100vw"/>
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-6 p-4">
        <h1 className="text-6xl font-bold text-white text-center">Witamy w Bibliotece</h1>
        <p className="text-white text-2xl text-center">Sanktuarium dla bibliofilów. Dziel się swoją pasją czytania.</p>
        <Button asChild className="text-xl px-8 h-12 cursor-pointer rounded-lg"><Link href="/catalogs">Przeglądaj książki</Link></Button>
      </div>
    </div>
    </div>
  );
}
