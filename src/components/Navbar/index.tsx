import { ModeToggle } from "../ModeToggle";


export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>Your Logo</div>
      <ModeToggle/>
    </nav>
  )
}