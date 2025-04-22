
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { pipeline } from "@huggingface/transformers";
import { useToast } from "@/hooks/use-toast";

const ContractAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    issues: { title: string; description: string; severity: "high" | "medium" | "low" }[];
    suggestions: string[];
  }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [textModel, setTextModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const { toast } = useToast();
  const [extractedText, setExtractedText] = useState("");

  // Load NLP model on component mount
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsModelLoading(true);
        // Use a sentiment analysis model for identifying problematic clauses
        const nlpModel = await pipeline(
          "text-classification",
          "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
          { quantized: true }
        );
        setTextModel(nlpModel);
        setIsModelLoading(false);
        
        toast({
          title: "Analysis models loaded",
          description: "The contract analysis system is ready to use",
        });
      } catch (error) {
        console.error("Error loading models:", error);
        toast({
          variant: "destructive",
          title: "Error loading models",
          description: "Using fallback analysis method",
        });
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, [toast]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is a PDF or DOC
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
      });
      return;
    }

    setFile(file);
    setAnalysisResult(null);
    
    // In a production environment, we would use a document parsing service
    // For this demo, we'll simulate text extraction
    simulateTextExtraction(file);
  };

  const simulateTextExtraction = (file: File) => {
    // In a real application, this would use OCR or document parsing APIs
    // For simulation purposes, we're creating placeholder text based on file name
    const reader = new FileReader();
    
    reader.onload = () => {
      // Simulate extracted text based on file name for demo purposes
      let extractedText = "";
      
      if (file.name.toLowerCase().includes("lease") || file.name.toLowerCase().includes("rental")) {
        extractedText = `RENTAL AGREEMENT
        
        This RENTAL AGREEMENT is made on [DATE] between [LANDLORD NAME] (hereinafter referred to as the "Landlord") and [TENANT NAME] (hereinafter referred to as the "Tenant").
        
        1. PROPERTY: The Landlord agrees to rent to the Tenant the property located at [ADDRESS].
        
        2. TERM: The term of this Agreement shall be for a period of 11 months, commencing on [START DATE] and ending on [END DATE].
        
        3. RENT: The Tenant agrees to pay a monthly rent of Rs. 25,000 payable in advance on the 1st day of each month.
        
        4. SECURITY DEPOSIT: The Tenant shall pay a security deposit of Rs. 300,000 (equivalent to 12 months' rent) to be held by the Landlord.
        
        5. UTILITIES: The Tenant shall be responsible for payment of all utilities and services.
        
        6. MAINTENANCE: The Tenant shall keep the premises in good condition. Major repairs shall be the responsibility of the landlord, but notification must be given within 1 day.
        
        7. ALTERATIONS: No alterations shall be made to the premises without prior written consent of the Landlord.
        
        8. TERMINATION: Either party may terminate this agreement with 15 days' notice.
        
        9. ENTRY: The Landlord may enter the premises at any time without notice for inspection purposes.
        
        10. ASSIGNMENT: The Tenant shall not assign this Agreement or sublet any part of the premises.
        
        11. GOVERNING LAW: This Agreement shall be governed by the laws of India.
        
        12. The tenant agrees to vacate the premises immediately upon request by the landlord for any reason deemed necessary by the landlord.`;
      } else {
        extractedText = "Standard contract agreement with typical terms and conditions. Please upload a rental or lease agreement for more specific analysis.";
      }
      
      setExtractedText(extractedText);
    };
    
    reader.readAsText(file); // This doesn't actually read the content of PDF/DOC, just triggers the onload event
  };

  const analyzeContract = async () => {
    if (!extractedText) {
      toast({
        variant: "destructive",
        title: "No text extracted",
        description: "Unable to extract text from the document",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Split the contract into clauses for analysis
      const clauses = extractedText.split(/\d+\./).filter(clause => clause.trim().length > 0);
      
      // Legal rules to check against
      const legalRules = [
        {
          name: "Security Deposit Limit",
          rule: (text) => {
            const match = text.match(/security deposit of Rs\.\s*(\d+[,\d]*)/i);
            if (match) {
              const deposit = parseInt(match[1].replace(/,/g, ''));
              const rentMatch = extractedText.match(/monthly rent of Rs\.\s*(\d+[,\d]*)/i);
              if (rentMatch) {
                const rent = parseInt(rentMatch[1].replace(/,/g, ''));
                return deposit > rent * 10 ? {
                  issue: true,
                  severity: "high",
                  title: "Excessive Security Deposit",
                  description: `The security deposit (Rs. ${deposit.toLocaleString()}) exceeds the legal limit of 10 months' rent (Rs. ${(rent*10).toLocaleString()}) in many states.`
                } : null;
              }
            }
            return null;
          }
        },
        {
          name: "Notice Period",
          rule: (text) => {
            const match = text.toLowerCase().match(/terminate|termination|notice|vacate/);
            if (match) {
              const daysMatch = text.match(/(\d+)\s*days['']?\s*notice/i);
              if (daysMatch && parseInt(daysMatch[1]) < 30) {
                return {
                  issue: true,
                  severity: "high",
                  title: "Inadequate Notice Period",
                  description: `The notice period of ${daysMatch[1]} days is less than the legally required minimum of 30 days in most states.`
                };
              } else if (!daysMatch && match) {
                return {
                  issue: true,
                  severity: "medium",
                  title: "Ambiguous Notice Period",
                  description: "The notice period for termination is not clearly specified or is ambiguous."
                };
              }
            }
            return null;
          }
        },
        {
          name: "Entry Rights",
          rule: (text) => {
            if (text.toLowerCase().includes("landlord may enter") && 
                (text.toLowerCase().includes("any time") || 
                 text.toLowerCase().includes("without notice"))) {
              return {
                issue: true,
                severity: "high",
                title: "Unreasonable Entry Rights",
                description: "The landlord's right to enter the premises without notice or at any time violates tenant privacy rights."
              };
            }
            return null;
          }
        },
        {
          name: "Tenant Obligations",
          rule: (text) => {
            if (text.toLowerCase().includes("tenant") && 
                text.toLowerCase().includes("responsible") && 
                (text.toLowerCase().includes("all repairs") || 
                 text.toLowerCase().includes("all maintenance"))) {
              return {
                issue: true,
                severity: "medium",
                title: "Unfair Maintenance Responsibilities",
                description: "The clause places all maintenance responsibilities on the tenant, which contradicts standard legal provisions."
              };
            }
            return null;
          }
        },
        {
          name: "Immediate Eviction",
          rule: (text) => {
            if ((text.toLowerCase().includes("vacate") || 
                 text.toLowerCase().includes("evict") || 
                 text.toLowerCase().includes("terminate")) && 
                (text.toLowerCase().includes("immediately") || 
                 text.toLowerCase().includes("any reason") || 
                 text.toLowerCase().includes("without cause"))) {
              return {
                issue: true,
                severity: "high",
                title: "Illegal Eviction Clause",
                description: "The contract contains provisions allowing for immediate eviction without due process, which is illegal."
              };
            }
            return null;
          }
        }
      ];
      
      // Analyze each clause against legal rules
      const issues = [];
      
      for (const clause of clauses) {
        for (const rule of legalRules) {
          const result = rule.rule(clause);
          if (result && result.issue) {
            issues.push({
              title: result.title,
              description: result.description,
              severity: result.severity
            });
          }
        }
        
        // Use NLP model to detect potentially problematic language if available
        try {
          if (textModel && clause.length > 10) {
            const sentiment = await textModel(clause);
            if (sentiment[0].label === "NEGATIVE" && sentiment[0].score > 0.75) {
              // Check if this clause is not already flagged by rule-based system
              const alreadyFlagged = issues.some(issue => 
                clause.includes(issue.title) || issue.description.includes(clause.substring(0, 20))
              );
              
              if (!alreadyFlagged) {
                issues.push({
                  title: "Potentially Unfair Clause",
                  description: `The following clause contains potentially unfair or one-sided language: "${clause.substring(0, 100)}${clause.length > 100 ? '...' : ''}"`,
                  severity: "medium"
                });
              }
            }
          }
        } catch (error) {
          console.error("Error in NLP analysis:", error);
        }
      }
      
      // Generate suggestions based on identified issues
      const suggestions = [];
      
      if (issues.some(issue => issue.title.includes("Security Deposit"))) {
        suggestions.push("Reduce the security deposit to comply with the legal maximum of 10 months' rent.");
      }
      
      if (issues.some(issue => issue.title.includes("Notice Period"))) {
        suggestions.push("Add a specific notice period of at least 30 days for termination of the agreement.");
      }
      
      if (issues.some(issue => issue.title.includes("Entry Rights"))) {
        suggestions.push("Modify landlord entry rights to require at least 24 hours notice except in emergencies.");
      }
      
      if (issues.some(issue => issue.title.includes("Maintenance"))) {
        suggestions.push("Clearly define maintenance responsibilities in accordance with Section 108 of the Transfer of Property Act.");
      }
      
      if (issues.some(issue => issue.title.includes("Eviction"))) {
        suggestions.push("Remove any clauses allowing immediate eviction without due process, as this violates tenant protection laws.");
      }
      
      // Add general suggestions if specific ones aren't generated
      if (suggestions.length === 0 && issues.length > 0) {
        suggestions.push("Review and revise problematic clauses identified in the analysis.");
        suggestions.push("Consult with a legal expert specialized in property law to ensure compliance with current regulations.");
      }
      
      // If no issues found
      if (issues.length === 0) {
        issues.push({
          title: "No Major Issues Detected",
          description: "Our analysis did not detect any major legal issues in the contract. However, we recommend having a legal professional review the document for complete assurance.",
          severity: "low"
        });
        
        suggestions.push("Consider having a legal professional review the document for complete assurance.");
      }
      
      setAnalysisResult({
        issues,
        suggestions
      });
      
    } catch (error) {
      console.error("Error analyzing contract:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing the document. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="contract-analysis" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Contract Analysis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Upload your rental or property agreement to identify potential risks and legal issues
          </p>
          {isModelLoading && (
            <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-2 rounded inline-flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Loading analysis models...
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {!file && (
            <div
              className={`p-10 border-2 border-dashed rounded-lg ${
                isDragging ? "border-primary bg-primary-100" : "border-gray-300"
              } transition-all flex flex-col items-center justify-center cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Upload size={48} className="text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Drop your document here or click to browse
              </h3>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          )}

          {file && !isAnalyzing && !analysisResult && (
            <div className="p-8">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setFile(null)}
                  className="text-gray-600"
                >
                  Remove
                </Button>
              </div>
              <Button 
                onClick={analyzeContract} 
                className="button-primary w-full"
                disabled={isModelLoading}
              >
                Analyze Contract
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="p-10 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium text-gray-800">
                Analyzing your contract...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Our AI is reviewing the document for legal issues and risks
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Analysis Results
              </h3>

              <div className="mb-8">
                <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                  Potential Issues Identified
                </h4>
                <div className="space-y-4">
                  {analysisResult.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        issue.severity === "high"
                          ? "border-red-500 bg-red-50"
                          : issue.severity === "medium"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <h5 className="font-medium text-gray-900 mb-1">{issue.title}</h5>
                      <p className="text-gray-700">{issue.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs font-medium uppercase tracking-wide">
                          Severity:
                        </span>
                        <span
                          className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                            issue.severity === "high"
                              ? "bg-red-200 text-red-800"
                              : issue.severity === "medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-green-50 p-3 rounded-lg"
                    >
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex space-x-4">
                <Button className="button-primary flex-1">
                  Download Analysis Report
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null);
                    setAnalysisResult(null);
                  }}
                  className="flex-1"
                >
                  Analyze Another Contract
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContractAnalyzer;
