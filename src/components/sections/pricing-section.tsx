import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { useState } from "react";

const plans = [
  {
    title: "Basic Plan",
    description: "Essential care for individuals",
    price: "$99",
    period: "month",
    features: [
      "General health check-ups",
      "Basic lab tests",
      "Preventive screenings",
      "Email support",
      "Online consultations"
    ],
    popular: false,
    bgColor: "bg-white dark:bg-slate-800",
    delay: 0.1
  },
  {
    title: "Family Plan",
    description: "Comprehensive care for families",
    price: "$199",
    period: "month",
    features: [
      "All Basic Plan features",
      "Coverage for up to 4 family members",
      "Pediatric care included",
      "24/7 phone support",
      "Priority scheduling"
    ],
    popular: true,
    bgColor: "bg-primary-50 dark:bg-primary-900/30",
    delay: 0.2
  },
  {
    title: "Premium Plan",
    description: "Complete care package",
    price: "$299",
    period: "month",
    features: [
      "All Family Plan features",
      "Unlimited specialist consultations",
      "Advanced diagnostic tests",
      "Priority appointments",
      "Personal health coordinator"
    ],
    popular: false,
    bgColor: "bg-white dark:bg-slate-800",
    delay: 0.3
  }
];

export function PricingSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: ["-10px", "0px", "10px", "0px", "-10px"],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      id="pricing" 
      className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      <motion.div 
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
        whileInView={floatingAnimation}
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary/20">
            Our Pricing
          </span>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl">
            Our Best Healthcare Packages
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Choose the plan that fits your needs and budget. All plans include access to our qualified medical 
            professionals and state-of-the-art facilities.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`relative rounded-xl border border-slate-200 ${plan.bgColor} shadow-md transition-all duration-500 dark:border-slate-700`}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.7, delay: plan.delay } 
              } : { 
                opacity: 0, 
                y: 30 
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className="border-b border-slate-200 p-8 dark:border-slate-700">
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.title}
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>
                <div className="mb-2 flex items-end">
                  <motion.span 
                    className="text-5xl font-extrabold text-primary"
                    animate={hoveredCard === index ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.price}
                  </motion.span>
                  <span className="ml-1 text-lg text-slate-500 dark:text-slate-400">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Billed {plan.period}ly, cancel anytime
                </p>
              </div>
              
              <div className="p-8">
                <h4 className="mb-4 font-medium text-slate-900 dark:text-white">
                  What's included:
                </h4>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isIntersecting ? { 
                        opacity: 1, 
                        x: 0, 
                        transition: { delay: plan.delay + 0.1 + featureIndex * 0.05 } 
                      } : { 
                        opacity: 0, 
                        x: -10 
                      }}
                    >
                      <div className="mr-3 rounded-full bg-primary/10 p-1 dark:bg-primary/20">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleNavClick("contact")}
                  className={`group w-full ${plan.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Choose Plan
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Decorative dots - matching other sections */}
        <div className="mt-16 flex justify-center space-x-2">
          <motion.div 
            className="h-3 w-3 rounded-full bg-primary"
            animate={isIntersecting ? { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="h-3 w-3 rounded-full bg-primary/70"
            animate={isIntersecting ? { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}
