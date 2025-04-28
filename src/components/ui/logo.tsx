import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  textClassName?: string;
  animate?: boolean;
}

export function Logo({ className, textClassName, animate = false }: LogoProps) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const Component = animate ? motion.div : "div";
  const TextComponent = animate ? motion.span : "span";

  return (
    <Component 
      className={cn("flex items-center", className)}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      variants={animate ? logoVariants : undefined}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-9 w-9 text-primary" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16h-4" />
      </svg>
      <TextComponent 
        className={cn("ml-2 text-xl font-bold", textClassName || "text-primary")}
        variants={animate ? textVariants : undefined}
      >
        Propound Finance
      </TextComponent>
    </Component>
  );
}
