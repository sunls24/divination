export default function Nav() {
  return (
    <div className="bg-stone-100 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center gap-2 sm:justify-start">
            <img
              className="h-6 w-auto opacity-60 sm:animate-[spin_3s_linear_infinite]"
              src="img/chatgpt.png"
              alt="chatgpt"
            />
            <span className="text-stone-600">AI 算卦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
