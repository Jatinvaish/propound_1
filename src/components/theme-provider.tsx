'use client';
import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      try {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      } catch {
        return defaultTheme;
      }
    }
  );
  
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    let resolvedTheme: "light" | "dark";
    
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      resolvedTheme = theme as "light" | "dark";
    }
    
    setResolvedTheme(resolvedTheme);
    root.classList.add(resolvedTheme);

    // Set CSS variables based on theme
    if (resolvedTheme === 'dark') {
      document.documentElement.style.setProperty('--primary-color', '#0D8689');
      document.documentElement.style.setProperty('--background-color', '#121212');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#0D8689');
      document.documentElement.style.setProperty('--background-color', '#ffffff');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const resolvedTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(resolvedTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolvedTheme);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // Handle localStorage error
        console.error("Failed to save theme preference:", error);
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
