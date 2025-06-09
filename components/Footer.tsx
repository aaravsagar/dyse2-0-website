import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#2F3136] border-t border-[#42454A] py-12 mt-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#B9BBBE]">
            <Link href="/" className="hover:text-white transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300 font-medium">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300 font-medium">
              Privacy
            </Link>
            <Link href="/commands" className="hover:text-white transition-colors duration-300 font-medium">
              Commands
            </Link>
            <Link href="/status" className="hover:text-white transition-colors duration-300 font-medium">
              Status
            </Link>
          </nav>
          
          <Separator className="bg-[#42454A] w-32" />
          
          <div className="flex flex-col items-center gap-3">
            <p className="text-[#B9BBBE] text-sm font-medium">
              Made with ❤️ by YEKKIHORA
            </p>
            <p className="text-[#72767D] text-xs">
              © 2024 - {currentYear} DYSE 2.0 – All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}