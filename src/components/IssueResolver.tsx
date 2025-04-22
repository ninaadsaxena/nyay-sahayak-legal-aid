
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, AlertTriangle, FileText, BookOpen } from "lucide-react";
import { pipeline } from "@huggingface/transformers";
import { useToast } from "@/hooks/use-toast";

const IssueResolver = () => {
  const [issueText, setIssueText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const { toast } = useToast();
  const [analysisResult, setAnalysisResult] = useState<null | {
    relevantLaws: { name: string; section: string; description: string }[];
    advice: string;
    steps: string[];
  }>(null);

  // Legal knowledge base (simplified for demo)
  const legalDatabase = {
    rentControl: {
      name: "Rent Control Act",
      sections: {
        "15(2)": "Prohibits eviction without proper notice and valid grounds as specified by law.",
        "8(1)": "Controls the amount of rent that can be charged in certain areas."
      }
    },
    ipc: {
      name: "IPC",
      sections: {
        "448": "Punishment for house-trespass. Applicable if landlord forcefully enters premises.",
        "441": "Defines criminal trespass as entering property with intent to intimidate, insult or annoy."
      }
    },
    bns: {
      name: "Bhartiya Nyay Samhita",
      sections: {
        "318": "Protection against threats and intimidation.",
        "319": "Defines punishment for intimidation and coercion."
      }
    },
    transferOfPropertyAct: {
      name: "Transfer of Property Act",
      sections: {
        "108": "Defines the rights and liabilities of lessor and lessee.",
        "111": "Determines when a lease of immovable property determines (ends)."
      }
    }
  };

  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        // Using text-classification pipeline for sentiment and intent analysis
        const classifier = await pipeline(
          "text-classification", 
          "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
          { quantized: true }
        );
        setModel(classifier);
        setIsModelLoading(false);
        
        toast({
          title: "NLP Model loaded",
          description: "The legal analysis model is ready to use",
        });
      } catch (error) {
        console.error("Error loading NLP model:", error);
        toast({
          variant: "destructive",
          title: "Error loading NLP model",
          description: "Using fallback analysis method",
        });
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, [toast]);

  const analyzeLegalIssue = async (text) => {
    // Define key legal terms to look for
    const keywords = {
      eviction: ["evict", "remove", "vacate", "leave", "kick out"],
      rentIncrease: ["increase", "raise", "hike", "rent", "payment"],
      repair: ["repair", "fix", "broken", "damage", "maintenance"],
      deposit: ["deposit", "security", "refund", "return", "money"],
      harassment: ["harass", "threaten", "intimidate", "bully", "pressure"],
      trespass: ["trespass", "enter", "access", "come in", "break in"],
      notice: ["notice", "inform", "tell", "warn", "letter"]
    };

    // Convert text to lowercase for easier matching
    const lowerText = text.toLowerCase();
    
    // Identify issues in the text
    const identifiedIssues = Object.entries(keywords).filter(([_, terms]) => 
      terms.some(term => lowerText.includes(term))
    ).map(([issue]) => issue);

    // Get sentiment if model is available
    let sentiment = "neutral";
    try {
      if (model) {
        const result = await model(text);
        sentiment = result[0].label;
      }
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }

    const urgency = sentiment === "NEGATIVE" ? "high" : "medium";
    
    // Match issues to relevant laws
    const relevantLaws = [];
    
    if (identifiedIssues.includes("eviction")) {
      relevantLaws.push({
        name: legalDatabase.rentControl.name,
        section: "Section 15(2)",
        description: legalDatabase.rentControl.sections["15(2)"]
      });
    }
    
    if (identifiedIssues.includes("trespass") || identifiedIssues.includes("harassment")) {
      relevantLaws.push({
        name: legalDatabase.ipc.name,
        section: "Section 448",
        description: legalDatabase.ipc.sections["448"]
      });
      
      relevantLaws.push({
        name: legalDatabase.bns.name,
        section: "Section 318",
        description: legalDatabase.bns.sections["318"]
      });
    }
    
    if (identifiedIssues.includes("repair")) {
      relevantLaws.push({
        name: legalDatabase.transferOfPropertyAct.name,
        section: "Section 108",
        description: legalDatabase.transferOfPropertyAct.sections["108"]
      });
    }
    
    if (identifiedIssues.includes("rentIncrease")) {
      relevantLaws.push({
        name: legalDatabase.rentControl.name,
        section: "Section 8(1)",
        description: legalDatabase.rentControl.sections["8(1)"]
      });
    }

    // Generate steps and advice based on identified issues
    let advice = "";
    let steps = [];
    
    if (identifiedIssues.length === 0) {
      advice = "Based on the information provided, we couldn't identify specific legal issues. Please provide more details about your situation for a more accurate analysis.";
      steps = ["Provide more detailed information about your housing or rental issue"];
    } else {
      if (identifiedIssues.includes("eviction")) {
        advice = "Based on your situation, the landlord cannot evict you without following proper legal procedure. Threats of forceful eviction are illegal under multiple provisions of law.";
        steps = [
          "Document all communications with your landlord in writing",
          "Send a formal notice citing the relevant laws that protect you as a tenant",
          "If threats continue, file a police complaint under IPC Section 448 and BNS Section 318",
          "Approach the Rent Control Tribunal in your district for an injunction against eviction",
          "Consider mediation through a legal aid service for quicker resolution"
        ];
      } else if (identifiedIssues.includes("repair")) {
        advice = "Your landlord has legal obligations to maintain the property in habitable condition. Section 108 of the Transfer of Property Act outlines these responsibilities.";
        steps = [
          "Send a written notice to your landlord detailing the required repairs",
          "Include a reasonable deadline for completion of repairs",
          "If repairs are not made, you may file a complaint with the local municipal authority",
          "In extreme cases, you may have grounds to withhold rent, but consult a lawyer before doing so",
          "Document all repair issues with photographs and written communications"
        ];
      } else if (identifiedIssues.includes("rentIncrease")) {
        advice = "Rent increases are regulated in many Indian states. The landlord must follow specific procedures and cannot increase rent beyond the statutory limits.";
        steps = [
          "Review your rental agreement for clauses regarding rent increases",
          "Check the applicable Rent Control Act in your state for maximum permitted increases",
          "Request a written notice explaining the reason for the increase",
          "If the increase exceeds legal limits, file a petition with the Rent Controller",
          "Consider negotiating with the landlord for a mutually acceptable increase"
        ];
      } else if (identifiedIssues.includes("harassment") || identifiedIssues.includes("trespass")) {
        advice = "Landlord harassment and unauthorized entry are illegal. You have legal protections under both the IPC and the new Bhartiya Nyay Samhita.";
        steps = [
          "Maintain a detailed log of all instances of harassment or trespass",
          "Send a formal cease and desist letter to the landlord",
          "File a police complaint if the harassment continues",
          "Apply for a restraining order if necessary",
          "Consult with a housing rights lawyer about potential civil action"
        ];
      }
    }

    return {
      relevantLaws: relevantLaws.length > 0 ? relevantLaws : [{
        name: "General Legal Information",
        section: "N/A",
        description: "Based on the information provided, we couldn't identify specific laws that apply to your situation. Please provide more details for a more accurate analysis."
      }],
      advice,
      steps
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeLegalIssue(issueText);
      setIsAnalyzing(false);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing issue:", error);
      setIsAnalyzing(false);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error processing your request. Please try again.",
      });
    }
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
          {isModelLoading && (
            <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-2 rounded inline-flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Loading AI analysis model...
            </div>
          )}
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
                <Button 
                  type="submit" 
                  className="button-primary w-full"
                  disabled={isModelLoading}
                >
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
