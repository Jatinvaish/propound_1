import { useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    content: "123 Healthcare Blvd, Medical District\nNew York, NY 10001"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    content: "(123) 456-7890"
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    content: "info@eshealthcare.com"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Hours",
    content: "Monday - Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed"
  }
];

const socialIcons = [
  { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
  { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" }
];

const serviceOptions = [
  { value: "primary-care", label: "Primary Care" },
  { value: "specialized-care", label: "Specialized Care" },
  { value: "diagnostic", label: "Diagnostic Services" },
  { value: "preventive", label: "Preventive Care" }
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function ContactSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="contact" 
      className="bg-primary-700 py-20 text-white lg:py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          <motion.div variants={containerVariants}>
            <motion.span 
              className="mb-2 inline-block rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold uppercase text-white"
              variants={itemVariants}
            >
              Contact Us
            </motion.span>
            <motion.h2 
              className="mb-4 text-3xl font-bold lg:text-4xl"
              variants={itemVariants}
            >
              Have Questions? We're Here To Help!
            </motion.h2>
            <motion.p 
              className="mb-8 text-lg text-primary-100"
              variants={itemVariants}
            >
              Our friendly staff is available to answer your questions and schedule appointments.
            </motion.p>
            
            <motion.div 
              className="mb-8 space-y-6"
              variants={containerVariants}
            >
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="mr-4 rounded-full bg-primary-600 p-3">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="whitespace-pre-line text-primary-100">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="rounded-full bg-primary-600 p-3 transition-colors hover:bg-primary-500"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.form 
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-8 shadow-md dark:bg-slate-800"
              initial={{ opacity: 0, y: 50 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Send us a message</h3>
              
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-900 dark:text-white">First Name</Label>
                  <Input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-900 dark:text-white">Last Name</Label>
                  <Input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" 
                  />
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="email" className="text-slate-900 dark:text-white">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="border-slate-300 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" 
                />
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="phone" className="text-slate-900 dark:text-white">Phone</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-slate-300 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" 
                />
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="service" className="text-slate-900 dark:text-white">Service</Label>
                <Select onValueChange={handleServiceChange} value={formData.service}>
                  <SelectTrigger 
                    className="border-slate-300 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="message" className="text-slate-900 dark:text-white">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="border-slate-300 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
