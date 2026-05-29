"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Garante que o componente só seja renderizado no client-side para evitar mismatch de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <li className="flex flex-row items-center justify-between w-full opacity-50 select-none">
        <span>Tema Escuro</span>
        <Moon size={16} className="text-slate-400" />
      </li>
    );
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dracula" : "corporate");
  };

  return (
    <li className="flex flex-row items-center justify-between w-full">
      <span>Tema Escuro</span>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={theme === "dracula"}
          onChange={handleThemeChange}
        />

        {/* sun icon (visible when checked / dark theme) */}
        <Sun size={16} className="swap-on text-amber-400" />

        {/* moon icon (visible when unchecked / light theme) */}
        <Moon size={16} className="swap-off text-slate-400" />
      </label>
    </li>
  );
}
