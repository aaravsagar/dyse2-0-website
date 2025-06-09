'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  Command, 
  AlertCircle, 
  Activity, 
  Menu, 
  X,
  Mail,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userAgreementsOpen, setUserAgreementsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { 
      label: 'User Agreements', 
      icon: FileText, 
      dropdown: true,
      isOpen: userAgreementsOpen,
      toggle: () => {
        setUserAgreementsOpen(!userAgreementsOpen);
      },
      items: [
        { path: '/terms', label: 'Terms & Conditions' },
        { path: '/privacy', label: 'Privacy Policy' }
      ]
    },
    { path: '/commands', label: 'Commands', icon: Command },
    { path: '/changelog', label: 'Changelog', icon: FileText },
    { path: '/status', label: 'Status', icon: Activity },
    { path: '/report', label: 'Report', icon: AlertCircle },
    { path: '/feedback', label: 'Feedback', icon: Mail },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E1F22]/95 backdrop-blur-sm border-b border-[#2D2F32] shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500/20 group-hover:ring-red-500/40 transition-all duration-300">
              <Image 
                src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512" 
                alt="DYSE Logo" 
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white text-xl hidden sm:inline-block group-hover:text-red-400 transition-colors">
              DYSE 2.0
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => 
              !link.dropdown ? (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "relative flex items-center px-4 py-2 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80 rounded-lg transition-all duration-300",
                    pathname === link.path && "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                  )}
                  asChild
                >
                  <Link href={link.path ?? '/'}>
                    <link.icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </Button>
              ) : (
                <div key={index} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative flex items-center px-4 py-2 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80 rounded-lg transition-all duration-300",
                      (link.isOpen || link.items?.some(item => pathname === item.path)) && 
                      "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    )}
                    onClick={link.toggle}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300", 
                      link.isOpen && "transform rotate-180"
                    )} />
                  </Button>
                  
                  <AnimatePresence>
                    {link.isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-64 rounded-xl bg-[#36393F] border border-[#42454A] shadow-2xl z-10 overflow-hidden"
                      >
                        <div className="py-2">
                          {link.items?.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.path ?? '/'}
                              className={cn(
                                "block px-4 py-3 text-sm text-[#B9BBBE] hover:bg-red-500/10 hover:text-white transition-all duration-200",
                                pathname === item.path && "bg-red-500/20 text-white border-r-2 border-red-500"
                              )}
                              onClick={() => {
                                link.toggle?.();
                                closeMenu();
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            onClick={toggleMenu}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#2F3136] border-b border-[#42454A]"
          >
            <div className="container px-4 mx-auto py-4 space-y-2">
              {navLinks.map((link, index) => 
                !link.dropdown ? (
                  <Button
                    key={index}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start flex items-center px-4 py-3 gap-3 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80 rounded-lg transition-all duration-300",
                      pathname === link.path && "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    )}
                    asChild
                  >
                    <Link 
                      href={link.path ?? '/'}
                      onClick={closeMenu}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </Button>
                ) : (
                  <div key={index} className="space-y-2">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start flex items-center px-4 py-3 gap-3 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80 rounded-lg transition-all duration-300",
                        (link.isOpen || link.items?.some(item => pathname === item.path)) && 
                        "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                      )}
                      onClick={link.toggle}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 ml-auto transition-transform duration-300", 
                        link.isOpen && "transform rotate-180"
                      )} />
                    </Button>
                    
                    <AnimatePresence>
                      {link.isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-8 space-y-1"
                        >
                          {link.items?.map((item, idx) => (
                            <Button
                              key={idx}
                              variant="ghost"
                              className={cn(
                                "w-full justify-start flex items-center px-4 py-2 text-sm text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80 rounded-lg transition-all duration-300",
                                pathname === item.path && "bg-red-500/20 text-white"
                              )}
                              asChild
                            >
                              <Link 
                                href={item.path ?? '/'}
                                onClick={closeMenu}
                              >
                                {item.label}
                              </Link>
                            </Button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}