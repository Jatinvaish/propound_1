import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/utils";

const services = [
  {
    title: "Primary Care",
    description: "Comprehensive preventive care, routine check-ups, and management of chronic conditions for patients of all ages.",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Medical",
    delay: 0.1
  },
  {
    title: "Specialized Care",
    description: "Expert treatment for complex conditions from our team of specialized doctors with years of experience.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Specialty",
    delay: 0.2
  },
  {
    title: "Diagnostic Services",
    description: "Advanced diagnostic testing and imaging to accurately identify conditions using the latest technology.",
    image: "https://images.unsplash.com/photo-1612277954950-66499a9b048e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Lab",
    delay: 0.3
  },
  {
    title: "Preventive Care",
    description: "Health screenings, vaccinations, and lifestyle counseling to prevent illness and maintain optimal health.",
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Wellness",
    delay: 0.4
  }
];

export function ServicesSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
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
        damping: 20
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: ["-10px", "0px", "10px", "0px", "-10px"],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      id="services" 
      className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0 }}
        animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div 
        className="absolute -right-20 top-40 h-40 w-40 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0 }}
        animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
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
            Our Premium Services
          </span>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl">
            Our Premium Facility Services
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Comprehensive healthcare services designed to meet all your medical needs with precision and care,
            delivered by our team of experienced professionals.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.7, delay: service.delay } 
              } : { 
                opacity: 0, 
                y: 30 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              
              <div className="relative p-6">
                {/* Category badge */}
                <div className="absolute -top-5 right-6 z-10">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    {service.category}
                  </span>
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mb-5 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
                <motion.button
                  onClick={() => handleNavClick("contact")}
                  className="inline-flex items-center font-medium text-primary transition-colors hover:text-primary-dark dark:text-primary-light dark:hover:text-white"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Decorative dots */}
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
