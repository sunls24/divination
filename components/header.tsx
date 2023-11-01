import { ChatGPT } from "@/components/svg";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="h-14 bg-secondary py-2 shadow">
      <div className="mx-auto flex h-full w-full items-center justify-center sm:max-w-md sm:justify-between md:max-w-2xl">
        <div className="flex gap-2">
          <ChatGPT />
          <span>AI 算卦</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
