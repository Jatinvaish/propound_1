'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const ContactSection: React.FC = () => {
    const { ref, isIntersecting } = useIntersectionObserver();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        amount: "",
        message: "",
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would send the data to a server
        console.log("Form submitted:", formData);
        setFormSubmitted(true);

        // Reset form after submission
        setFormData({
            name: "",
            email: "",
            phone: "",
            businessName: "",
            amount: "",
            message: "",
        });

        // Reset form submission status after 5 seconds
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    };

    return (
        <section ref={ref as React.RefObject<HTMLElement>}
            className="py-24 bg-slate-50 relative overflow-hidden section-overlap" id="contact">
            {/* Background decorations */}
            <div className="bg-radial-gradient absolute inset-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-blue-600 font-medium">Contact Us</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 mt-2">
                                Get in touch with our finance experts
                            </h2>

                            <p className="text-lg text-slate-600 mb-8 max-w-lg">
                                Have questions about financing options for your business? Our team is here to help you find the perfect solution.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start">
                                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Phone</h3>
                                        <p className="text-slate-600">1300 123 456</p>
                                        <p className="text-slate-500 text-sm">Monday-Friday, 9am-5pm AEST</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Email</h3>
                                        <p className="text-slate-600">info@propoundfinance.com.au</p>
                                        <p className="text-slate-500 text-sm">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1">Office</h3>
                                        <p className="text-slate-600">123 Business Avenue</p>
                                        <p className="text-slate-600">Sydney, NSW 2000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-white p-3 rounded-full shadow-sm text-blue-600 hover:text-blue-700 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                    </svg>
                                </a>

                                <a
                                    href="#"
                                    className="bg-white p-3 rounded-full shadow-sm text-blue-600 hover:text-blue-700 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>

                                <a
                                    href="#"
                                    className="bg-white p-3 rounded-full shadow-sm text-blue-600 hover:text-blue-700 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
                                <h3 className="text-xl font-bold text-slate-800 mb-6">
                                    Schedule a consultation
                                </h3>

                                {formSubmitted ? (
                                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                                        <div className="flex">
                                            <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h4 className="font-medium">Thank you for your message!</h4>
                                                <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Full Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Email Address*
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Phone Number*
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Business Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="businessName"
                                                    name="businessName"
                                                    value={formData.businessName}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                                                Financing Amount
                                            </label>
                                            <select
                                                id="amount"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select an amount</option>
                                                <option value="Under $50,000">Under $50,000</option>
                                                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                                <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                                                <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                                                <option value="Over $1,000,000">Over $1,000,000</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Tell us about your financing needs"
                                            ></textarea>
                                        </div>

                                        <div className="text-right">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                            >
                                                Submit Request
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;