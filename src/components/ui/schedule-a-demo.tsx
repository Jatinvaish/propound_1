'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form schema setup (simplified for artifact)
// Note: In a real implementation, you would need to add react-hook-form and zod
// as they were in the original code

const MultiStepForm: React.FC<MultiStepFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    serviceType: [] as string[],
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    website: "",
    country: "",
    solutions: [] as string[],
    industry: "",
    businessType: "",
    message: "",
    acceptTerms: false
  });
  
  // Service options for step 1
  const serviceOptions = [
    { id: "online-payments", label: "Online Payments" },
    { id: "in-person-payments", label: "In-person Payments" },
    { id: "card-issuing", label: "Card Issuing" },
    { id: "international-payments", label: "International Payments" }
  ];
  
  // Payment solution options for step 3
  const paymentSolutions = {
    "online-payments": [
      { id: "direct-debit", label: "Direct Debit" },
      { id: "visa-mc", label: "Visa/Mastercard/AMEX/JCB" },
      { id: "wallet", label: "BPAY For Web/Wallet" },
      { id: "alipay", label: "Alipay, WeChat Pay, UnionPay" },
      { id: "pay-link", label: "Pay By Link" }
    ],
    "in-person-payments": [
      { id: "terminals", label: "Payment Terminals" },
      { id: "softpos", label: "SoftPOS" },
      { id: "qr", label: "QR Code Payments" }
    ],
    "card-issuing": [
      { id: "virtual-cards", label: "Virtual Cards" },
      { id: "physical-cards", label: "Physical Cards" },
      { id: "gift-cards", label: "Gift Cards" }
    ],
    "international-payments": [
      { id: "fx", label: "FX Payments" },
      { id: "remittance", label: "Remittance" }
    ]
  };
  
  // For demo purposes - simplified validation and handlers
  const handleNextStep = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    setStep(step + 1);
  };
  
  const handleBackStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
    setStep(1);
    setCompletedSteps([]);
  };
  
  // Improved modal animation
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };
  
  // Update field handler
  const updateField = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Toggle service selection
  const toggleService = (serviceId: string) => {
    const currentServices = [...formData.serviceType];
    if (currentServices.includes(serviceId)) {
      updateField('serviceType', currentServices.filter(id => id !== serviceId));
    } else {
      updateField('serviceType', [...currentServices, serviceId]);
    }
  };
  
  // Toggle solution selection
  const toggleSolution = (solutionId: string) => {
    const currentSolutions = [...formData.solutions];
    if (currentSolutions.includes(solutionId)) {
      updateField('solutions', currentSolutions.filter(id => id !== solutionId));
    } else {
      updateField('solutions', [...currentSolutions, solutionId]);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogOverlay className="bg-black/40 backdrop-blur-sm transition-all duration-300" />
          <DialogContent className="max-w-[90%] md:max-w-md lg:max-w-lg p-0 bg-white text-slate-800 border-0 rounded-lg shadow-xl m-4 sm:m-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalAnimation}
              className="w-full"
            >
              <DialogTitle className="sr-only">Finance Request Form</DialogTitle>
              <div className="relative">
                {/* Progress indicator - Responsive design */}
                <div className="flex items-center justify-center mb-4 sm:mb-6 px-4 sm:px-6 pt-4 sm:pt-6 relative">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center z-10 relative w-1/4">
                      <div 
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs sm:text-base
                          ${step === stepNumber 
                            ? "bg-gradient-to-r from-teal-500 to-cyan-500 border-teal-500 text-white font-bold" 
                            : completedSteps.includes(stepNumber)
                            ? "bg-gradient-to-r from-teal-500 to-green-500 border-teal-500 text-white"
                            : "border-slate-200 text-slate-400 bg-slate-50"
                          }`}
                      >
                        {completedSteps.includes(stepNumber) ? (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          stepNumber
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Progress line - behind the step circles */}
                  <div className="absolute top-[36px] sm:top-[42px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-0.5 bg-slate-200"></div>
                  <div 
                    className="absolute top-[36px] sm:top-[42px] left-[calc(12.5%+8px)] h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                    style={{ 
                      width: step === 1 ? '0%' : 
                            step === 2 ? '33.33%' : 
                            step === 3 ? '66.66%' : 
                            '100%' 
                    }}
                  ></div>
                </div>
                
                {/* Form content - Responsive padding and typography */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-slate-800">Ready to get your finance sorted?</h2>
                        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                          Fill out the simple form below and our finance experts will be in touch to find out more about how we can solve your needs.
                        </p>
                        
                        <div className="mb-4 sm:mb-6">
                          <label className="block text-slate-800 font-medium mb-3 text-sm sm:text-base">
                            What type of service are you looking for?*
                          </label>
                          <div className="space-y-2 sm:space-y-3">
                            {serviceOptions.map((option) => (
                              <div key={option.id} className="relative flex items-start">
                                <div className="flex h-5 sm:h-6 items-center">
                                  <input
                                    id={option.id}
                                    type="checkbox"
                                    className="h-4 w-4 sm:h-5 sm:w-5 rounded border-slate-300 bg-white text-teal-500 focus:ring-teal-500 focus:ring-offset-white"
                                    checked={formData.serviceType.includes(option.id)}
                                    onChange={() => toggleService(option.id)}
                                  />
                                </div>
                                <label htmlFor={option.id} className="ml-2 sm:ml-3 block text-xs sm:text-sm font-medium text-slate-700">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          {formData.serviceType.length === 0 && (
                            <p className="mt-2 text-xs sm:text-sm text-red-500">Please select at least one service</p>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-6 sm:mt-8">
                          <button
                            type="button"
                            onClick={onClose}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-all duration-200"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={formData.serviceType.length === 0}
                          >
                            Next
                          </button>
                        </div>
                      </motion.div>
                    )}
                    
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800">Let's start with your details</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div>
                            <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                              Enter your first name*
                            </label>
                            <input
                              id="firstName"
                              className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Enter your first name"
                              value={formData.firstName}
                              onChange={(e) => updateField('firstName', e.target.value)}
                            />
                            {formData.firstName === "" && (
                              <p className="mt-1 text-xs text-red-500">First name is required</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                              Enter your last name*
                            </label>
                            <input
                              id="lastName"
                              className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Enter your last name"
                              value={formData.lastName}
                              onChange={(e) => updateField('lastName', e.target.value)}
                            />
                            {formData.lastName === "" && (
                              <p className="mt-1 text-xs text-red-500">Last name is required</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Enter your company email*
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter your company email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                          />
                          {formData.email === "" && (
                            <p className="mt-1 text-xs text-red-500">Email is required</p>
                          )}
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <label htmlFor="companyName" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Enter your company name
                          </label>
                          <input
                            id="companyName"
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter your company name"
                            value={formData.companyName}
                            onChange={(e) => updateField('companyName', e.target.value)}
                          />
                        </div>
                        
                         
                        
                        <div className="mb-4 sm:mb-6">
                          <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Select your country*
                          </label>
                          <select
                            id="country"
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={formData.country}
                            onChange={(e) => updateField('country', e.target.value)}
                          >
                            <option value="">Select your country</option>
                            <option value="australia">Australia</option>
                            <option value="new-zealand">New Zealand</option>
                            <option value="singapore">Singapore</option>
                            <option value="malaysia">Malaysia</option>
                            <option value="other">Other</option>
                          </select>
                          {formData.country === "" && (
                            <p className="mt-1 text-xs text-red-500">Country is required</p>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-6 sm:mt-8">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-all duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.country}
                          >
                            Next
                          </button>
                        </div>
                      </motion.div>
                    )}
                    
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-slate-800">Let's narrow it down to the right product for you.</h2>
                        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
                          Select solutions you think you may be interested in:
                        </p>
                        
                        {/* Group solutions by service type */}
                        <div className="max-h-[40vh] sm:max-h-[50vh] overflow-y-auto pr-1">
                          {formData.serviceType.map((serviceType) => {
                            const serviceKey = serviceType as keyof typeof paymentSolutions;
                            if (paymentSolutions[serviceKey]?.length) {
                              return (
                                <div key={serviceType} className="mb-4 sm:mb-6">
                                  <h3 className="text-sm sm:text-lg font-medium text-slate-800 mb-2 sm:mb-3">
                                    {serviceOptions.find(s => s.id === serviceType)?.label}
                                  </h3>
                                  <div className="space-y-1.5 sm:space-y-2 ml-1 sm:ml-2">
                                    {paymentSolutions[serviceKey].map((solution) => (
                                      <div key={solution.id} className="relative flex items-start">
                                        <div className="flex h-5 sm:h-6 items-center">
                                          <input
                                            id={solution.id}
                                            type="checkbox"
                                            className="h-4 w-4 sm:h-5 sm:w-5 rounded border-slate-300 bg-white text-teal-500 focus:ring-teal-500 focus:ring-offset-white"
                                            checked={formData.solutions.includes(solution.id)}
                                            onChange={() => toggleSolution(solution.id)}
                                          />
                                        </div>
                                        <label htmlFor={solution.id} className="ml-2 sm:ml-3 block text-xs sm:text-sm font-medium text-slate-700">
                                          {solution.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                        
                        <div className="flex justify-between mt-6 sm:mt-8">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-all duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                          >
                            Next
                          </button>
                        </div>
                      </motion.div>
                    )}
                    
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800">Just a few more details to tailor your experience</h2>
                        
                        <div className="mb-3 sm:mb-4">
                          <label htmlFor="industry" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Select your industry*
                          </label>
                          <select
                            id="industry"
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={formData.industry}
                            onChange={(e) => updateField('industry', e.target.value)}
                          >
                            <option value="">Select your industry</option>
                            <option value="retail">Retail</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="hospitality">Hospitality</option>
                            <option value="professional">Professional Services</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="technology">Technology</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="other">Other</option>
                          </select>
                          {formData.industry === "" && (
                            <p className="mt-1 text-xs text-red-500">Industry is required</p>
                          )}
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <label htmlFor="businessType" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Describe your business*
                          </label>
                          <select
                            id="businessType"
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            value={formData.businessType}
                            onChange={(e) => updateField('businessType', e.target.value)}
                          >
                            <option value="">Select business type</option>
                            <option value="startup">Startup (0-2 years)</option>
                            <option value="growing">Growing Business (2-5 years)</option>
                            <option value="established">Established Business (5+ years)</option>
                            <option value="enterprise">Enterprise</option>
                          </select>
                          {formData.businessType === "" && (
                            <p className="mt-1 text-xs text-red-500">Business type is required</p>
                          )}
                        </div>
                        
                        <div className="mb-3 sm:mb-4">
                          <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Anything else you'd like to share with us?
                          </label>
                          <textarea
                            id="message"
                            rows={3}
                            className="w-full p-1.5 sm:p-2 bg-white border border-slate-300 rounded-md text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Additional information about your needs..."
                            value={formData.message}
                            onChange={(e) => updateField('message', e.target.value)}
                          ></textarea>
                        </div>
                        
                        <div className="mb-4 sm:mb-6">
                          <div className="flex items-start">
                            <div className="flex h-5 sm:h-6 items-center">
                              <input
                                id="acceptTerms"
                                type="checkbox"
                                className="h-4 w-4 sm:h-5 sm:w-5 rounded border-slate-300 bg-white text-teal-500 focus:ring-teal-500 focus:ring-offset-white"
                                checked={formData.acceptTerms}
                                onChange={(e) => updateField('acceptTerms', e.target.checked)}
                              />
                            </div>
                            <label htmlFor="acceptTerms" className="ml-2 sm:ml-3 block text-xs sm:text-sm text-slate-700">
                              I agree to the terms and conditions and privacy policy*
                            </label>
                          </div>
                          {!formData.acceptTerms && (
                            <p className="mt-1 text-xs text-red-500">You must accept the terms</p>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-6 sm:mt-8">
                          <button
                            type="button"
                            onClick={handleBackStep}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-all duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="py-1.5 sm:py-2 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            disabled={!formData.industry || !formData.businessType || !formData.acceptTerms}
                          >
                            Submit
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MultiStepForm;