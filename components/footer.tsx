import React from "react";
import { VERSION } from "@/lib/constant";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="mx-auto flex items-center gap-1 text-xs text-muted-foreground/80">
      <span className="italic">心诚则灵</span>
      <a
        target="_blank"
        href="https://github.com/sunls24/divination"
        className="flex items-center gap-1 rounded p-1 transition-colors hover:bg-border"
      >
        <Github size={16} />
        <span className="underline underline-offset-2">v{VERSION}</span>
      </a>
    </footer>
  );
}

export default Footer;
