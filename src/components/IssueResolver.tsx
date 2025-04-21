
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, AlertTriangle, FileText, BookOpen } from "lucide-react";

const IssueResolver = () => {
  const [issueText, setIssueText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    relevantLaws: { name: string; section: string; description: string }[];
    advice: string;
    steps: string[];
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsAnalyzing(true);
    // Mock analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        relevantLaws: [
          {
            name: "Rent Control Act",
            section: "Section 15(2)",
            description: "Prohibits eviction without proper notice and valid grounds as specified by law."
          },
          {
            name: "IPC",
            section: "Section 448",
            description: "Punishment for house-trespass. Applicable if landlord forcefully enters premises."
          },
          {
            name: "Bhartiya Nyay Samhita",
            section: "Section 318",
            description: "Protection against threats and intimidation."
          }
        ],
        advice: "Based on your situation, the landlord cannot evict you without following proper legal procedure. Threats of forceful eviction are illegal under multiple provisions of law.",
        steps: [
          "Document all communications with your landlord in writing",
          "Send a formal notice citing the relevant laws that protect you as a tenant",
          "If threats continue, file a police complaint under IPC Section 448 and BNS Section 318",
          "Approach the Rent Control Tribunal in your district for an injunction against eviction",
          "Consider mediation through a legal aid service for quicker resolution"
        ]
      });
    }, 2000);
  };

  return (
    <section id="issue-resolution" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Issue Resolution Assistant
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Describe your housing or rental issue to get relevant legal information and guidance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!isAnalyzing && !analysisResult && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Describe your issue
                  </label>
                  <Textarea
                    placeholder="Example: My landlord is threatening to evict me without notice because I asked for repairs. I have a 2-year lease agreement that started 8 months ago..."
                    className="input-field h-40"
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Please provide relevant details such as rental agreement terms, duration of stay, and exact nature of the issue.
                  </p>
                </div>
                <Button type="submit" className="button-primary w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Get Legal Guidance
                </Button>
              </form>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium text-gray-800">
                Analyzing your issue...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Our AI is identifying relevant laws and preparing guidance
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary-100 p-6 border-b border-primary-200">
                <h3 className="text-xl font-semibold text-primary-900">Legal Analysis</h3>
                <p className="text-gray-700 mt-1">Based on the details you provided</p>
              </div>
              
              <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Relevant Laws
                  </h4>
                  <div className="space-y-3">
                    {analysisResult.relevantLaws.map((law, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between">
                          <span className="font-medium text-primary-800">{law.name}</span>
                          <span className="text-primary-600 bg-primary-50 px-2 py-1 rounded text-sm">
                            {law.section}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2 text-sm">{law.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <AlertTriangle className="h-5 w-5 mr-2 text-secondary-600" />
                    Legal Advisory
                  </h4>
                  <div className="bg-secondary-50 border-l-4 border-secondary p-4 rounded-r-lg">
                    <p className="text-gray-800">{analysisResult.advice}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Recommended Steps
                  </h4>
                  <ol className="space-y-3">
                    {analysisResult.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <p className="text-sm text-gray-500">
                    <strong>Disclaimer:</strong> This analysis is based on AI interpretation of the information provided and should not be considered as a substitute for professional legal advice. Please consult with a qualified lawyer for specific legal counsel.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button className="button-primary flex-1">
                    Download Advisory
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIssueText("");
                      setAnalysisResult(null);
                    }}
                    className="flex-1"
                  >
                    Start New Inquiry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IssueResolver;
