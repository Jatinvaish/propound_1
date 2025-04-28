import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className={cn("rounded-full relative overflow-hidden", className)}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ y: resolvedTheme === "dark" ? -30 : 0, opacity: resolvedTheme === "dark" ? 0 : 1 }}
        animate={{ y: resolvedTheme === "dark" ? -30 : 0, opacity: resolvedTheme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      
      <motion.div
        initial={{ y: resolvedTheme === "dark" ? 0 : 30, opacity: resolvedTheme === "dark" ? 1 : 0 }}
        animate={{ y: resolvedTheme === "dark" ? 0 : 30, opacity: resolvedTheme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </Button>
  );
}
