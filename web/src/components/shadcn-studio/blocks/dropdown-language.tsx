"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ko", name: "한국인", flag: "🇰🇷" },
];

interface LanguageDropdownProps {
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  defaultOpen?: boolean;
}

export function LanguageDropdown({ trigger, align = "end" }: LanguageDropdownProps) {
  const [currentLang, setCurrentLang] = React.useState(languages[0]);

  const defaultTrigger = (
    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-secondary">
      <span>{currentLang.flag}</span>
      <span>{currentLang.name}</span>
    </button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48 card-glass border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setCurrentLang(lang)}
            className={cn(
              "flex items-center gap-3 cursor-pointer focus:bg-secondary",
              currentLang.code === lang.code ? "text-primary" : "text-white"
            )}
          >
            <span>{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageDropdown;