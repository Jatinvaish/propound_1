import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Updated specialties with more detailed descriptions and matching the reference design
const specialties = [
  {
    title: "Primary Care",
    description: "Comprehensive care for patients of all ages with a focus on prevention",
    icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    bgcolor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    delay: 0.1
  },
  {
    title: "Cardiology",
    description: "Expert heart care and treatment using advanced diagnostic techniques",
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    bgcolor: "bg-rose-50 dark:bg-rose-900/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-200 dark:border-rose-800",
    delay: 0.2
  },
  {
    title: "Pediatrics",
    description: "Specialized care for children from newborns to adolescents",
    icon: "https://cdn-icons-png.flaticon.com/512/3043/3043918.png",
    bgcolor: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    delay: 0.3
  },
  {
    title: "Orthopedics",
    description: "Treatment for bone and joint conditions with surgical and non-surgical options",
    icon: "https://cdn-icons-png.flaticon.com/512/6134/6134057.png",
    bgcolor: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    delay: 0.4
  }
];

export function SpecialtiesSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
        damping: 15,
        mass: 1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.5, rotate: -10, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Floating animation for background elements
  const floatingAnimation = {
    y: ["-15px", "0px", "15px", "0px", "-15px"],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      id="specialties" 
      className="relative overflow-hidden py-20 lg:py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.1 }}
        whileInView={floatingAnimation}
      />
      <motion.div 
        className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary/20">
            Our Expertise
          </span>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl">
            Meet Our Specialties
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Our diverse team of specialists ensures comprehensive care for all your health needs,
            with expertise across multiple medical disciplines.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {specialties.map((specialty, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={itemVariants}
              custom={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.7, delay: specialty.delay } 
              } : { 
                opacity: 0, 
                y: 30 
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className={`relative mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 ${specialty.borderColor} ${specialty.bgcolor} p-4 shadow-lg`}
                variants={iconVariants}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.img 
                  src={specialty.icon} 
                  alt={specialty.title} 
                  className={`h-16 w-16 ${specialty.iconColor}`}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                {/* Animated circles in the background */}
                <motion.div 
                  className="absolute inset-0 z-0 rounded-full opacity-30"
                  animate={{ 
                    scale: [1, 1.1, 1], 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              
              <motion.h3 
                className="mb-3 text-xl font-bold text-slate-900 dark:text-white"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 } 
                  }
                }}
              >
                {specialty.title}
              </motion.h3>
              
              <motion.p 
                className="mx-auto max-w-xs text-slate-600 dark:text-slate-300"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, delay: 0.2 } 
                  }
                }}
              >
                {specialty.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Decorative dots - matching the services section */}
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
