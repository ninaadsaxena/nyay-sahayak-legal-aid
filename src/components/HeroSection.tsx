
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-100 to-white py-20 px-4 md:px-6 lg:py-28">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight">
            Your Virtual Legal Assistant for Housing & Rental Laws
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg">
            Protecting tenants and landlords with AI-powered legal assistance for housing, rental, and land laws in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="button-primary text-lg py-6 px-8">Analyze Contract</Button>
            <Button className="button-outline text-lg py-6 px-8">Resolve Issue</Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-secondary-200 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-200 rounded-full opacity-40 blur-3xl"></div>
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-float">
            <div className="bg-primary p-4 flex items-center space-x-2">
              <div className="h-3 w-3 bg-red-400 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
              <div className="h-3 w-3 bg-green-400 rounded-full"></div>
              <div className="ml-2 text-white font-medium">Nyay Sahayak Assistant</div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 bg-primary-200 rounded-full flex-shrink-0 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-gray-700 max-w-xs">
                  My landlord is threatening to evict me without proper notice. What can I do?
                </div>
              </div>
              <div className="flex items-start space-x-4 justify-end">
                <div className="bg-primary-100 rounded-lg p-3 text-primary-800 max-w-xs">
                  According to the Rent Control Act applicable in your state, landlords must provide a minimum notice period before eviction. Let me explain your rights and the proper legal procedure...
                </div>
                <div className="h-8 w-8 bg-secondary-200 rounded-full flex-shrink-0 flex items-center justify-center">
                  <svg className="h-5 w-5 text-secondary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
