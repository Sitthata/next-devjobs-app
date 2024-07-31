import Image from "next/image";
import { ModeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <div className="flex justify-between bg-cover bg-nav-pattern bg-no-repeat p-12">
      <Image
        src="/assets/desktop/logo.svg"
        alt="logo"
        width={115}
        height={32}
      />
      <ModeToggle />
    </div>
  );
}
