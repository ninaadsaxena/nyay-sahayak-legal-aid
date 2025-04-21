
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";

const ContractAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    issues: { title: string; description: string; severity: "high" | "medium" | "low" }[];
    suggestions: string[];
  }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
      alert('Please upload a PDF or Word document');
      return;
    }

    setFile(file);
    setAnalysisResult(null);
  };

  const analyzeContract = () => {
    // Mock analysis process
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock results
      setAnalysisResult({
        issues: [
          {
            title: "Ambiguous Notice Period",
            description: "Clause 8 specifies an ambiguous notice period for termination that may not comply with the Rent Control Act.",
            severity: "high"
          },
          {
            title: "Illegal Security Deposit Amount",
            description: "The security deposit exceeds the legal limit of 10 months' rent as per state regulations.",
            severity: "high"
          },
          {
            title: "Maintenance Responsibility Unclear",
            description: "Clause 12 does not clearly define maintenance responsibilities between landlord and tenant.",
            severity: "medium"
          },
          {
            title: "Missing Essential Terms",
            description: "The agreement does not specify the procedure for rent increases, which should be included.",
            severity: "low"
          }
        ],
        suggestions: [
          "Add a specific notice period of at least 3 months as required by the Rent Control Act.",
          "Reduce the security deposit to comply with the legal maximum of 10 months' rent.",
          "Clearly define maintenance responsibilities in accordance with Section 108 of the Transfer of Property Act.",
          "Include the procedure and frequency for rent revision as per local regulations."
        ]
      });
    }, 3000);
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
              <Button onClick={analyzeContract} className="button-primary w-full">
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
