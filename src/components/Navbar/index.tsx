import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import MainLogo from '@/assets/images/mainLogo.png';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 mb-4 bg-white dark:bg-black shadow-md">
      <div className="w-20 sm:w-24 md:w-28 lg:w-32">
        <Image
          src={MainLogo}
          alt="Ui Forge"
          layout="responsive"
          width={50}
          height={50}
          priority
        />
      </div>
      <ModeToggle />
    </nav>
  );
}
