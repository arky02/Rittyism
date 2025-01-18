import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Background from "/public/images/background.svg";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="flex justify-center items-center h-screen w-screen flex-col gap-[65px]">
      <Image
        src={Background}
        className="w-full h-full object-cover absolute -z-10"
        alt="background"
      />
      <Component {...pageProps} />
    </main>
  );
}
