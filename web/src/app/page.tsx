import { Header } from "./components/Header";
import { AnimatedText } from "./components/AnimatedText";
import { Notification } from "./components/Notification";

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-white">
      <Header />
      <main className="flex w-full h-[90vh] items-center justify-center">
        <AnimatedText />
      </main>
      <footer className="absolute bottom-0 left-0 w-full h-10 pl-4 row-start-3 flex gap-6 flex-wrap items-center justify-start">
        <span className="text-black">&copy; {year} Solana DApp</span>
      </footer>
      <Notification />
    </div>
  );
}
