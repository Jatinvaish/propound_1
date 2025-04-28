import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { scrollToElement } from "@/lib/utils";

const features = [
  {
    title: "Experienced Specialists",
    description: "Our team consists of board-certified physicians with years of experience in their respective fields."
  },
  {
    title: "Modern Facilities",
    description: "State-of-the-art equipment and comfortable treatment rooms designed for your comfort."
  },
  {
    title: "Patient-Centered Care",
    description: "We take the time to listen and develop personalized treatment plans for every patient."
  },
  {
    title: "Affordable Options",
    description: "We work with most insurance plans and offer transparent pricing options for all services."
  }
];

// Images arranged to match the reference design
const images = [
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Modern hospital room",
    className: "col-span-2 h-full lg:h-48",
    delay: 0.1
  },
  {
    src: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a88b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Healthcare team meeting",
    className: "row-span-2 h-full",
    delay: 0.2
  },
  {
    src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Medical professional",
    className: "h-full lg:h-40",
    delay: 0.3
  },
  {
    src: "https://images.unsplash.com/photo-1587642313581-ba7864128445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Medical technology",
    className: "col-span-3 h-48",
    delay: 0.4
  }
];

export function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
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
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const imageHoverVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section 
      id="about" 
      className="relative overflow-hidden py-20 lg:py-28"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.div 
        className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/5 dark:bg-primary/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isIntersecting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {/* Image Grid - Left Side */}
          <motion.div 
            className="relative order-2 lg:order-1"
            variants={containerVariants}
          >
            <div className="grid grid-cols-3 grid-rows-3 gap-4">
              {images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className={`overflow-hidden rounded-lg shadow-md ${image.className}`}
                  variants={itemVariants}
                  custom={index}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isIntersecting ? 
                    { opacity: 1, y: 0, transition: { duration: 0.7, delay: image.delay } } : 
                    { opacity: 0, y: 30 }
                  }
                >
                  <motion.div className="h-full w-full overflow-hidden">
                    <motion.img 
                      src={image.src} 
                      alt={image.alt} 
                      className="h-full w-full object-cover"
                      variants={imageHoverVariants}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Floating badge */}
            <motion.div
              className="absolute -right-5 -top-5 z-10 rounded-lg bg-white p-4 shadow-xl dark:bg-slate-800 lg:-right-8 lg:-top-8"
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={isIntersecting ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 20, rotate: -5 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-primary">15+</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">Years of Excellence</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Content - Right Side */}
          <motion.div
            className="order-1 flex flex-col justify-center lg:order-2"
            variants={containerVariants}
          >
            <motion.div className="mb-8" variants={itemVariants}>
              <motion.span 
                className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:bg-primary/20"
                variants={itemVariants}
              >
                About Us
              </motion.span>
              <motion.h2 
                className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white lg:text-4xl"
                variants={itemVariants}
              >
                We Are Committed To Providing The Highest Quality Medical Care To You
              </motion.h2>
              <motion.p 
                className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
                variants={itemVariants}
              >
                At Propound Finance, we believe in a comprehensive approach to wellness that prioritizes your individual needs and promotes long-term well-being through preventive care and personalized treatment plans.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="mb-8 space-y-5"
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mr-4 rounded-full bg-primary/10 p-2 dark:bg-primary/20">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button 
                onClick={() => handleNavClick("services")}
                size="lg"
                className="group"
              >
                <span className="flex items-center gap-2">
                  Explore Our Services
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
