import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery images - making sure we match the layout in the reference image
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Reception Area",
    title: "Reception Area",
    type: "landscape" // horizontal image
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Examination Room",
    title: "Examination Room",
    type: "portrait" // vertical image
  },
  {
    src: "https://images.unsplash.com/photo-1516549655669-8433732c3a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Laboratory",
    title: "Laboratory",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Patient Room",
    title: "Patient Room",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "MRI machine",
    title: "Imaging Center",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1666214280429-35d1cc0fcc99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Waiting Area",
    title: "Waiting Area",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "X-ray Room",
    title: "X-ray Room",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Doctor's Office",
    title: "Doctor's Office",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Nursing Station",
    title: "Nursing Station",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Physical Therapy Room",
    title: "Physical Therapy",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Medical Team",
    title: "Medical Team",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1638202993928-7d113b8e4439?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Dental Office",
    title: "Dental Office",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Recovery Room",
    title: "Recovery Room",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1579684453377-eb08c9e1df6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Hospital Hallway",
    title: "Hospital Hallway",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a88b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Surgical Suite",
    title: "Surgical Suite",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1570936555854-08b59145b899?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Cardiology Center",
    title: "Cardiology Center",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1666214280580-7fec76792fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Emergency Room",
    title: "Emergency Room",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1587642313581-ba7864128445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Pharmacy",
    title: "Pharmacy",
    type: "landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Rehabilitation Center",
    title: "Rehabilitation Center",
    type: "portrait"
  },
  {
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Maternity Ward",
    title: "Maternity Ward",
    type: "landscape"
  }
];

export function GallerySection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(5);

  // Set column count based on screen size
  useEffect(() => {
    function getColumnCount() {
      const width = window.innerWidth;
      if (width >= 1200) return 5;
      if (width >= 992) return 4;
      if (width >= 768) return 3;
      if (width >= 480) return 2;
      return 2;
    }
    
    const handleResize = () => setColumnCount(getColumnCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (index: number) => setZoomedIndex(index);
  const handleNext = () => setZoomedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  const handlePrev = () => setZoomedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  const closeZoom = () => setZoomedIndex(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomedIndex === null) return;
      
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          closeZoom();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedIndex]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="gallery" 
      className="section-padding bg-slate-50 dark:bg-slate-900/50"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            Gallery
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            Quick Look Of Our Facility
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Take a virtual tour of our modern medical center designed for your comfort and care.
          </p>
        </motion.div>
        
        <motion.div
          style={{
            columnCount,
            columnGap: '1rem',
            width: '100%',
          }}
          className="mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.2 }}
              onClick={() => handleImageClick(index)}
            >
              <div className="group relative cursor-zoom-in overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full rounded-lg object-cover transition-all duration-500 group-hover:scale-105"
                  style={{
                    aspectRatio: image.type === "landscape" ? "4/3" : "3/4",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <h3 className="text-sm font-medium text-white sm:text-base">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox / Zoom View */}
      <AnimatePresence>
        {zoomedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeZoom}
          >
            <motion.button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={closeZoom}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <motion.div 
              className="relative max-h-[85vh] max-w-[85vw]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[zoomedIndex].src}
                alt={galleryImages[zoomedIndex].alt}
                className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
              />
              
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-xl font-medium text-white">{galleryImages[zoomedIndex].title}</h3>
              </div>
            </motion.div>
            
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
