
import React from "react";
import { FileText, MessageSquare, BookOpen, Users } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Contract Analysis",
    description: "Upload and analyze your rental agreements to identify potential risks and legal issues. Get AI-powered suggestions for contract improvements.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Issue Resolution",
    description: "Describe your housing or rental issue and get relevant legal information and advice based on Indian housing laws.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Law Reference",
    description: "Access comprehensive information on CrPC, IPC, and Bhartiya Nyay Samhita related to housing and rental laws in India.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Lawyer Connect",
    description: "Connect with specialized lawyers who can provide professional legal assistance for your specific housing or rental issues.",
  },
];

const FeatureSection = () => {
  return (
    <section className="section-padding bg-white" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            How Nyay Sahayak Can Help You
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our AI-powered legal assistant provides multiple tools to help landlords and tenants understand and navigate Indian housing and rental laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group hover:translate-y-[-5px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 rounded-full bg-primary-100 p-4 inline-block group-hover:bg-primary-200 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
