import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scrollToElement } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const services = [
  { label: "Truck Finance", href: "#" },
  { label: "Assets Finance", href: "#" },
  { label: "Equipement Finance", href: "#" },
  { label: "Solar Energy Finance", href: "#" },
  { label: "Advanced Medical Equipement Finance", href: "#" },
];

const quickLinks = [
  { label: "Refferal Page", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services" },
  { label: "Blog", id: "specialties" },
  { label: "Faqs", id: "pricing" },
  { label: "Calulator", id: "gallery" },
  { label: "Contact", id: "contact" },
];

const officeHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally submit to an API
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="mb-6" textClassName="text-white" />
            <p className="mb-6">Delivering outstanding financial services with a commitment to client trust, growth, and peace of mind.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-300 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-slate-300 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-slate-300 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-slate-300 transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="transition-colors hover:text-primary"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Office Hours</h3>
            <ul className="space-y-3">
              {officeHours.map((schedule, index) => (
                <li key={index} className="flex justify-between">
                  <span>{schedule.day}</span>
                  <span>{schedule.hours}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none border-slate-700 bg-slate-800 focus:ring-primary"
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Propound Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
