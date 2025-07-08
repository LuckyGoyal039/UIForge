import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import MainLogo from '@/assets/images/mainLogo.png';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 mb-4 bg-white dark:bg-black">
      <div className="">
        <div className="w-11 md:w-20 lg:w-30 fixed top-0 left-0">
          <Image
            src={MainLogo}
            alt="Ui Forge"
            layout="responsive"
            width={50}
            height={50}
            priority
          />
        </div>
      </div>
      <ModeToggle />
    </nav>
  );
}
