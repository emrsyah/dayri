import React, { useEffect } from "react";
import { UilMoon, UilSun } from "@iconscout/react-unicons";
import { useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<"night" | "cupcake">("night");
  const toggleTheme = () => {
    setTheme(theme === "cupcake" ? "night" : "cupcake");
  };
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <nav className="w-full bg-base-200 gap-5 h-16 navbar px-6 border-b-neutral border-b-[1.5px]">
      <div className="flex-1 font-extrabold text-lg text-primary">Dayri</div>
      <button onClick={toggleTheme} className="w-9 h-9 rounded-md bg-base-300 text-secondary cursor-pointer hover:text-primary flex items-center justify-center">
        {theme == "cupcake" ? <UilSun /> : <UilMoon />}
      </button>
      <button className="btn btn-secondary btn-sm font-bold">
        Login Google
      </button>
    </nav>
  );
};

export default Navbar;
