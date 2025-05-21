import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#2F3136] border-t border-[#42454A] py-8 mt-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#B9BBBE]">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/user-agreements/terms" className="hover:text-white transition-colors">
              User Agreements
            </Link>
            <Link to="/usage/commands" className="hover:text-white transition-colors">
              Usage
            </Link>
            <Link to="/status" className="hover:text-white transition-colors">
              Status
            </Link>
          </nav>
          
          <Separator className="bg-[#42454A] w-24" />
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#B9BBBE] text-sm">
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