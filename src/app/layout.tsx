import { ReactNode } from "react";
import { ThemeProvider } from "../components/theme-provider";
import { TooltipProvider } from "../components/ui/tooltip";
import { AppointmentProvider } from "../components/schedule-a-demo";
import { Toaster } from "../components/ui/toaster";
import "./globals.css"; // Assuming index.css is renamed to globals.css

export const metadata = {
  title: "Propound Finance",
  description: "Get Your Finance solutions with Propound",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light" storageKey="es-healthcare-theme">
          <TooltipProvider>
            <AppointmentProvider>
              <Toaster />
              {children}
            </AppointmentProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
