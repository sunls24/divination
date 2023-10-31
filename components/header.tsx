import { ChatGPT } from "@/components/svg";

export default function Header() {
  return (
    <header className="bg-secondary py-4 shadow">
      <div className="mx-auto flex w-full justify-center sm:max-w-md sm:justify-start md:max-w-2xl">
        <div className="flex gap-2">
          <ChatGPT />
          <span>AI 算卦</span>
        </div>
      </div>
    </header>
  );
}
