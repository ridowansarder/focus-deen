import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { MobileNav } from "./MobileNav";
import { UserButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/weekly", label: "Weekly" },
  { href: "/monthly", label: "Monthly" },
];

const Navbar = async () => {
  return (
    <header className="bg-background/80 border-b sticky top-0 z-50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            FocusDeen
          </Link>

          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-foreground/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <UserButton />
            <ModeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <MobileNav navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
