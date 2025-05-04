import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { scrollToElement } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useAppointment } from "@/components/schedule-a-demo";

const navItems = [
  { id: "home", label: "Refferal Page" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Blog" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact us" },
  // { id: "gallery", label: "Gallery" },
];

export function Header() {
  const { resolvedTheme } = useTheme();
  const { openMultiStepForm } = useAppointment();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navItems.map(item => item.id));

  // Track scroll position to add background to header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToElement(id);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? 
          "bg-white/95 backdrop-blur-md shadow-sm dark:bg-slate-900/95" : 
          "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <Logo animate={!scrolled} />
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "relative text-sm font-medium transition-all hover:text-primary",
                    activeSection === item.id ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                      layoutId="activeSection"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <ThemeToggle />
          </motion.div> */}
          
          <motion.div 
            className="hidden items-center gap-4 sm:flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
             
            
            <Button 
              onClick={openMultiStepForm} 
              size="sm"
              className="relative overflow-hidden"
              variant={resolvedTheme === "dark" ? "default" : "default"}
            >
              <span className="relative z-10 flex items-center gap-1">
                <Calendar size={16} />
                Schedule a Demo
              </span>
              <motion.span 
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="relative h-10 w-10 overflow-hidden rounded-full"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-background/95 backdrop-blur-sm lg:hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "block w-full py-2 text-left transition-all hover:pl-2 hover:text-primary",
                        activeSection === item.id ? "text-primary font-medium" : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li 
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button 
                    onClick={openMultiStepForm}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule a Demo
                    </span>
                  </Button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
