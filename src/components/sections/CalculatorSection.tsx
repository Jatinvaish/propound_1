'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CalculatorSection: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [termYears, setTermYears] = useState<number>(5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // Calculate the monthly payment
  useEffect(() => {
    const calculateLoanPayment = () => {
      // Convert annual interest rate to monthly and decimal
      const monthlyRate = interestRate / 100 / 12;
      const termMonths = termYears * 12;
      
      // Calculate monthly payment
      const x = Math.pow(1 + monthlyRate, termMonths);
      const monthly = (loanAmount * x * monthlyRate) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * termMonths);
    };
    
    calculateLoanPayment();
  }, [loanAmount, interestRate, termYears]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <section className="py-24   relative overflow-hidden section-overlap" id="calculator">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full opacity-60 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-50 rounded-full opacity-60 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Finance Calculator
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Use our calculator to estimate your monthly repayments and see how different loan amounts, terms, and interest rates affect your payments.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Loan Amount</h4>
                    <p className="text-slate-600">Select the total amount you wish to borrow</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Interest Rate</h4>
                    <p className="text-slate-600">Adjust the annual interest rate</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Loan Term</h4>
                    <p className="text-slate-600">Set the duration of the loan in years</p>
                  </div>
                </li>
              </ul>
              
              <p className="text-sm text-slate-500 italic">
                This calculator provides estimates only and does not account for all fees and charges. Speak with our finance experts for a personalized quote.
              </p>
            </motion.div>
            
            {/* Calculator */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="loanAmount" className="text-slate-700 font-medium">
                    Loan Amount: {formatCurrency(loanAmount)}
                  </label>
                </div>
                <input
                  type="range"
                  id="loanAmount"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$5,000</span>
                  <span>$1,000,000</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="interestRate" className="text-slate-700 font-medium">
                    Interest Rate: {interestRate}%
                  </label>
                </div>
                <input
                  type="range"
                  id="interestRate"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="termYears" className="text-slate-700 font-medium">
                    Loan Term: {termYears} years
                  </label>
                </div>
                <input
                  type="range"
                  id="termYears"
                  min="1"
                  max="30"
                  step="1"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <h3 className="text-slate-500 text-sm font-medium mb-2">Monthly Payment</h3>
                  <div className="text-3xl font-bold text-slate-800">
                    {formatCurrency(monthlyPayment)}
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-500 text-sm font-medium mb-2">Total Payment</h3>
                  <div className="text-xl font-semibold text-slate-800">
                    {formatCurrency(totalPayment)}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="#contact" 
                  className="btn-primary w-full"
                >
                  Get a Personalized Quote
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;