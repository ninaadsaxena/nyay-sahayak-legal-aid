
import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import ContractAnalyzer from "@/components/ContractAnalyzer";
import IssueResolver from "@/components/IssueResolver";
import LawReference from "@/components/LawReference";
import LawyerConnect from "@/components/LawyerConnect";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <ContractAnalyzer />
        <IssueResolver />
        <LawReference />
        <LawyerConnect />
      </main>
      <footer className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Nyay Sahayak</h3>
              <p className="text-gray-300">
                Virtual Legal Assistant for Housing, Rental and Land laws in India.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#contract-analysis" className="text-gray-300 hover:text-white">Contract Analysis</a></li>
                <li><a href="#issue-resolution" className="text-gray-300 hover:text-white">Issue Resolution</a></li>
                <li><a href="#law-reference" className="text-gray-300 hover:text-white">Law Reference</a></li>
                <li><a href="#lawyer-connect" className="text-gray-300 hover:text-white">Connect with Lawyers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Disclaimer</h4>
              <p className="text-gray-300 text-sm">
                This platform is for informational purposes only and does not constitute legal advice. 
                Always consult with a qualified lawyer for specific legal counsel.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Nyay Sahayak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
