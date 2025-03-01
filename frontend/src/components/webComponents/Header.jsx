import React from "react";
import { LucideGraduationCap } from "lucide-react";

function Header() {
  return (
    <header className="relative bg-blue-500 p-4 text-white">
      <p className="absolute top-1 right-4 text-[10px] opacity-80">
        Made by DJ and Team
      </p>

      <div className="flex space-x-2">
        <LucideGraduationCap size={32} />
        <span className="text-xl font-bold">JOSSA Counseling</span>
      </div>
    </header>
  );
}

export default Header;
