import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [userAgreementsOpen, setUserAgreementsOpen] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);
  
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
        { path: '/user-agreements/terms', label: 'Terms & Conditions' },
        { path: '/user-agreements/privacy', label: 'Privacy Policy' }
      ]
    },
    { path: '/usage/commands', label: 'Commands', icon: Command },
    { path: '/changelog', label: 'Changelog', icon: FileText },
    { path: '/status', label: 'Status', icon: Activity },
    { path: '/report', label: 'Report', icon: AlertCircle },
    { path: '/feedback', label: 'Feedback', icon: Mail },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E1F22]/95 backdrop-blur-sm border-b border-[#2D2F32] shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512" 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-white text-xl hidden sm:inline-block">DYSE 2.0</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => 
              !link.dropdown ? (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "relative flex items-center px-3 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80",
                    location.pathname === link.path && "bg-[#36393F] text-white"
                  )}
                  asChild
                >
                  <Link to={link.path ?? '/'}>
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </Button>
              ) : (
                <div key={index} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative flex items-center px-3 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80",
                      (link.isOpen || link.items?.some(item => location.pathname === item.path)) && 
                      "bg-[#36393F] text-white"
                    )}
                    onClick={link.toggle}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform", 
                      link.isOpen && "transform rotate-180"
                    )} />
                  </Button>
                  
                  <AnimatePresence>
                    {link.isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute mt-1 w-56 rounded-md bg-[#36393F] border border-[#42454A] shadow-lg z-10"
                      >
                        <div className="py-1">
                          {link.items?.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path ?? '/'}
                              className={cn(
                                "block px-4 py-2 text-sm text-[#B9BBBE] hover:bg-[#5865F2]/10 hover:text-white",
                                location.pathname === item.path && "bg-[#5865F2]/10 text-white"
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
            className="md:hidden p-2"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
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
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#2F3136] border-b border-[#42454A]"
          >
            <div className="container px-4 mx-auto py-3 space-y-1">
              {navLinks.map((link, index) => 
                !link.dropdown ? (
                  <Button
                    key={index}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start flex items-center px-3 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80",
                      location.pathname === link.path && "bg-[#36393F] text-white"
                    )}
                    asChild
                  >
                    <Link 
                      to={link.path ?? '/'}
                      onClick={closeMenu}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  </Button>
                ) : (
                  <div key={index} className="space-y-1">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start flex items-center px-3 gap-2 text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80",
                        (link.isOpen || link.items?.some(item => location.pathname === item.path)) && 
                        "bg-[#36393F] text-white"
                      )}
                      onClick={link.toggle}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 ml-auto transition-transform", 
                        link.isOpen && "transform rotate-180"
                      )} />
                    </Button>
                    
                    <AnimatePresence>
                      {link.isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-6"
                        >
                          {link.items?.map((item, idx) => (
                            <Button
                              key={idx}
                              variant="ghost"
                              className={cn(
                                "w-full justify-start flex items-center px-3 py-1 text-sm text-[#B9BBBE] hover:text-white hover:bg-[#36393F]/80",
                                location.pathname === item.path && "bg-[#36393F] text-white"
                              )}
                              asChild
                            >
                              <Link 
                                to={item.path ?? '/'}
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
