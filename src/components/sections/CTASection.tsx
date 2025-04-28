'use client';
import React from "react";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-800 relative overflow-hidden" id="cta">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <svg className="absolute right-0 top-0 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="url(#grad1)" points="0,0 100,0 100,100" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="p-8 md:p-12 lg:p-16 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ready to simplify your business finance?
              </motion.h2>
              
              <motion.p 
                className="text-blue-100 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Schedule a free consultation today and discover how Propound Finance can help your business grow with tailored financing solutions.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="#contact" 
                className="px-8 py-3 bg-green-500 hover:bg-blue-500 text-slate-900 font-semibold rounded-lg transition-colors shadow-lg w-full sm:w-auto text-center"
              >
                Schedule a Free Consultation
              </a>
              
              <a 
                href="tel:1300123456" 
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-colors w-full sm:w-auto text-center flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us at 1300 123 456
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center text-blue-100 text-sm font-medium">
                <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No obligation, free initial consultation</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Sticky Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-blue-600 py-3 px-4 flex justify-center items-center z-50 md:hidden">
            <a 
              href="#contact" 
              className="text-white font-medium flex items-center"
            >
              <span>Schedule a Free Finance Consultation Today</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;