import { buttonVariants } from "@/components/ui/button";
import { ClinicLogo } from "@/components/ui/logo";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClinicLogo className="w-12 h-12" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-2xl text-primary leading-tight">
              Dr. Anisa Sarvath
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Women's Health. Holistic Care.
            </span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="text-foreground transition-colors">Home</Link>
          <Link href="/treatments" className="hover:text-foreground transition-colors">Treatments</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/blogs" className="hover:text-foreground transition-colors">Blogs</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
        <div className="flex gap-4">

          <Link href="/book-appointment" className={buttonVariants({ className: "rounded-full shadow-md shadow-primary/20" })}>
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
