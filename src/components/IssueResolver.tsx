
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, AlertTriangle, FileText, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadLegalModel, analyzeLegalIssue, type AnalysisResult } from "@/utils/legalAnalysis";
import { useTranslation } from "react-i18next";

const IssueResolver = () => {
  const [issueText, setIssueText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const { toast } = useToast();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { t } = useTranslation();

  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        const loadedModel = await loadLegalModel();
        setModel(loadedModel);
        setIsModelLoading(false);
        
        toast({
          title: "Legal analysis model loaded",
          description: "The Indian legal NLP model is ready to use",
        });
      } catch (error) {
        console.error("Error loading legal NLP model:", error);
        toast({
          variant: "destructive",
          title: "Error loading legal model",
          description: "Using fallback analysis method",
        });
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      if (!model) {
        throw new Error("Model not loaded");
      }
      
      // Log the input text for debugging
      console.log("Analyzing legal issue with text:", issueText);
      
      // Get analysis result using NLP model
      const result = await analyzeLegalIssue(issueText, model);
      console.log("Analysis result:", result);
      
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

  const safeTranslate = (key: string): string => {
    try {
      return t(key);
    } catch (error) {
      console.warn("Translation failed, using fallback for:", key);
      return key;
    }
  };

  return (
    <section id="issue-resolution" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {safeTranslate("Issue Resolution Assistant")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {safeTranslate("Describe your housing or rental issue to get relevant legal information and guidance")}
          </p>
          {isModelLoading && (
            <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-2 rounded inline-flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {safeTranslate("Loading Indian law NLP analysis model...")}
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {!isAnalyzing && !analysisResult && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    {safeTranslate("Describe your issue")}
                  </label>
                  <Textarea
                    placeholder={safeTranslate("Example: My landlord is threatening to evict me without notice because I asked for repairs. I have a 2-year lease agreement that started 8 months ago...")}
                    className="input-field h-40"
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {safeTranslate("Please provide relevant details such as rental agreement terms, duration of stay, and exact nature of the issue.")}
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="button-primary w-full"
                  disabled={isModelLoading}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {safeTranslate("Get Legal Guidance")}
                </Button>
              </form>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium text-gray-800">
                {safeTranslate("Analyzing your issue...")}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {safeTranslate("Our AI is identifying relevant Indian laws and preparing guidance")}
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary-100 p-6 border-b border-primary-200">
                <h3 className="text-xl font-semibold text-primary-900">{safeTranslate("Legal Analysis")}</h3>
                <p className="text-gray-700 mt-1">{safeTranslate("Based on the details you provided")}</p>
              </div>
              
              <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {safeTranslate("Relevant Laws")}
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
                    {safeTranslate("Legal Advisory")}
                  </h4>
                  <div className="bg-secondary-50 border-l-4 border-secondary p-4 rounded-r-lg">
                    <p className="text-gray-800">{analysisResult.advice}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4 flex items-center text-gray-800">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    {safeTranslate("Recommended Steps")}
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
                    <strong>{safeTranslate("Disclaimer")}:</strong> {safeTranslate("This analysis is based on AI interpretation of the information provided and should not be considered as a substitute for professional legal advice. Please consult with a qualified lawyer for specific legal counsel.")}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button className="button-primary flex-1">
                    {safeTranslate("Download Advisory")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIssueText("");
                      setAnalysisResult(null);
                    }}
                    className="flex-1"
                  >
                    {safeTranslate("Start New Inquiry")}
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
