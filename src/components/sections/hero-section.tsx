import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Calendar } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useAppointment } from "@/components/schedule-a-demo";
import { useTheme } from "@/hooks/use-theme";
import { ContainerTextFlip } from "../ui/container-text-flip";

export function HeroSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ triggerOnce: true });
  const { openMultiStepForm } = useAppointment();
  const { resolvedTheme } = useTheme();
  const words = ["VEHICLE", "EQUIPMENT", "CASHFLOW "];

  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
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
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: ["-5%", "0%", "5%", "0%", "-5%"],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut"
    }
  };

  // Wavy animation for background elements
  const wavyAnimation = {
    rotate: [0, 2, 0, -2, 0],
    scale: [1, 1.05, 1, 0.95, 1],
    transition: {
      repeat: Infinity,
      duration: 12,
      ease: "easeInOut"
    }
  };

  return (
    // <section
    //   id="home"
    //   className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-slate-50 pt-16 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-800/50 lg:pt-20"

    // >
    <section ref={ref as React.RefObject<HTMLElement>} id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mb-8">
      {/* Dark grid background */}
      <div className="absolute inset-0 bg-grid-white" />

      {/* Background blob animations */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <motion.div
          className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary-light/30 via-primary/40 to-transparent blur-3xl"
          animate={{
            x: [0, 20, 40, 20, 0],
            y: [0, 30, 0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-400/30 via-cyan-300/20 to-transparent blur-3xl dark:from-blue-600/20 dark:via-cyan-500/10"
          animate={{
            x: [0, -30, 0, 30, 0],
            y: [0, 20, 40, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNjM4NTUiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtNnYtNmg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-80 dark:opacity-30"></div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 pb-16 pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center"
            variants={containerVariants}
          >
            <motion.span
              className="mb-4 inline-block rounded-full bg-gradient-to-r from-primary/20 to-primary-light/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:from-primary/30 dark:to-primary-light/30 dark:text-primary-light"
              variants={itemVariants}
            >
              FOR GROWING AUSSIE BUSINESSES
            </motion.span>

            <motion.h4
              className="mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent dark:from-white dark:to-slate-200 lg:text-3xl xl:text-3xl"
              variants={itemVariants}
            >
              FAST, FLEXIBLE FINANCE TO GET <span className="text-primary">Your
                <br />
                <ContainerTextFlip words={words} className="text-blue-gradient" animationDuration={4000} />
              </span> in <span className="text-primary">48 Hours</span>
            </motion.h4>

            <motion.p
              className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              variants={itemVariants}
            >
              Specialists in Business Asset & Equipment Loans Cart, Trucks, Trailers, Gear, Lifestyle-You Name it.
              <br />
              <br />
              Tailored financial solutions with faster approvals and expert guidance to fuel your business ambitions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button
                onClick={openMultiStepForm}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl dark:from-primary dark:to-primary-dark"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule a Demo
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-20"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(66, 153, 225, 0)", "0 0 0 15px rgba(66, 153, 225, 0)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </Button>

              <Button
                onClick={() => handleNavClick("services")}
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-primary/40 text-primary transition-all hover:border-primary hover:bg-primary/5 dark:border-primary/50 dark:hover:bg-primary/10"
              >
                <motion.span
                  className="absolute inset-0 rounded-md bg-primary/5 dark:bg-primary/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Our Services
                  <motion.span
                    className="transition-all"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 flex flex-wrap gap-8"
              variants={itemVariants}
              custom={5}
            >
              {[
                { number: "5000+", label: "Happy Clients" },
                { number: "10+", label: "Services" },
                { number: "10x", label: "Fast Procedures" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                >
                  <span className="text-3xl font-bold text-primary">{stat.number}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content with Images */}
          <motion.div
            className="relative"
            variants={imageContainerVariants}
          >
            <motion.div
              className="relative h-[450px] lg:h-[550px]"
              animate={isIntersecting ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              initial={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Decorative element */}
              <motion.div
                className="absolute -left-10 -top-10 h-40 w-40 rounded-full border-8 border-primary/20 dark:border-primary/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileInView={wavyAnimation}
              />

              {/* Blue ellipse background */}
              <motion.div
                className="absolute left-10 top-10 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-100 to-sky-200 blur-xl dark:from-blue-900/30 dark:to-blue-600/20 lg:h-[400px] lg:w-[400px]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isIntersecting ? { scale: 1, opacity: 0.7 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={floatingAnimation}
              />

              {/* Main image */}
              <motion.div
                className="absolute left-0 top-5 h-[320px] w-[75%] overflow-hidden rounded-2xl shadow-2xl lg:h-[400px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary-dark/40 opacity-30 mix-blend-overlay"
                  whileHover={{ opacity: 0.2 }}
                />
                <img
                  src="https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXNzZXR8ZW58MHx8MHx8fDA%3D"
                  alt="Healthcare professional team"
                  className="h-full w-full rounded-2xl object-cover transition-transform duration-10000 hover:scale-110"
                />

                {/* Image border gradient animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0.7 }}
                  animate={{
                    boxShadow: [
                      "inset 0 0 0 3px rgba(56, 189, 248, 0)",
                      "inset 0 0 0 3px rgba(56, 189, 248, 0.3)",
                      "inset 0 0 0 3px rgba(56, 189, 248, 0)"
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>

              {/* Secondary image */}
              <motion.div
                className="absolute bottom-0 right-0 h-[220px] w-[60%] overflow-hidden rounded-2xl shadow-xl lg:h-[280px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ y: 50, opacity: 0 }}
                animate={isIntersecting ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary-dark/40 opacity-30 mix-blend-overlay"
                  whileHover={{ opacity: 0.2 }}
                />
                <img
                  src="https://media.istockphoto.com/id/913219882/photo/financial-graph-on-technology-abstract-background.jpg?s=612x612&w=0&k=20&c=0P0vbPiPsHOH_uzZEzL6CmpZwIDIArtNj_PsQVwxkEM="
                  alt="Medical facility"
                  className="h-full w-full rounded-2xl object-cover transition-transform duration-10000 hover:scale-110"
                />

                {/* Image border gradient animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0.7 }}
                  animate={{
                    boxShadow: [
                      "inset 0 0 0 3px rgba(56, 189, 248, 0)",
                      "inset 0 0 0 3px rgba(56, 189, 248, 0.3)",
                      "inset 0 0 0 3px rgba(56, 189, 248, 0)"
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 1.5
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -left-4 h-20 w-44 overflow-hidden rounded-2xl bg-primary p-2 shadow-xl dark:bg-slate-800 lg:h-28 lg:w-28"
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={isIntersecting ? { opacity: 1, y: 0, rotate: -5 } : { opacity: 0, y: 20, rotate: -5 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary p-1 text-center text-sm font-bold text-white dark:from-primary dark:to-primary-dark lg:text-base">
                  <div>
                    <span className="block text-lg lg:text-xl">24/7</span>
                    <span className="block text-xs font-medium opacity-90 lg:text-sm">Support</span>
                  </div>
                </div>
              </motion.div>
              {/* Small floating card */}
              <motion.div
                className="absolute -right-5 top-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg dark:bg-slate-800 lg:px-4 lg:py-3"
                initial={{ opacity: 0, x: 20, rotate: 3 }}
                animate={isIntersecting ? { opacity: 1, x: 0, rotate: 3 } : { opacity: 0, x: 20, rotate: 3 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-900 dark:text-white">Modern Equipment</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Latest Technology</span>
                </div>
              </motion.div>
              <motion.div
                className="absolute -right-25 top-90 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg dark:bg-slate-800 lg:px-4 lg:py-3"
                initial={{ opacity: 0, x: 20, rotate: 3 }}
                animate={isIntersecting ? { opacity: 1, x: 0, rotate: 3 } : { opacity: 0, x: 20, rotate: 3 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-900 dark:text-white">Modern Equipment</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Latest Technology</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-5 top-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg dark:bg-slate-800 lg:px-4 lg:py-3"
                initial={{ opacity: 0, x: 20, rotate: 3 }}
                animate={isIntersecting ? { opacity: 1, x: 0, rotate: 3 } : { opacity: 0, x: 20, rotate: 3 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-900 dark:text-white">Modern Equipment</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Latest Technology</span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-16 right-10 hidden h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/5 lg:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileInView={floatingAnimation}
      />
      {/* <motion.div 
        className="absolute left-10 top-20 hidden h-28 w-28 rounded-full bg-gradient-to-tr from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/10 lg:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileInView={floatingAnimation}
      /> */}
      <motion.div
        className="absolute -right-10 top-32 hidden h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/10 lg:block"
        initial={{ scale: 0, opacity: 0 }}
        animate={isIntersecting ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileInView={floatingAnimation}
      />
    </section >
  );
}
