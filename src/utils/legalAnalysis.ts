
import { pipeline, type Pipeline } from "@huggingface/transformers";
import { LegalKnowledge } from "./legalKnowledge";

export interface AnalysisResult {
  relevantLaws: { name: string; section: string; description: string }[];
  advice: string;
  steps: string[];
}

export const loadLegalModel = async (): Promise<Pipeline> => {
  try {
    // Load a more appropriate model for legal text analysis
    // Using a text classification model as base
    return await pipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );
  } catch (error) {
    console.error("Error loading legal analysis model:", error);
    throw new Error("Failed to load legal analysis model");
  }
};

// Extract legal keywords from text using NLP
export const extractLegalKeywords = async (
  text: string,
  model: Pipeline
): Promise<string[]> => {
  // Define legal domain keywords to extract
  const legalDomains = [
    "eviction",
    "rent",
    "landlord",
    "tenant",
    "property",
    "lease",
    "harassment",
    "deposit",
    "damage",
    "repair",
    "notice",
    "trespass"
  ];

  try {
    // Get sentiment from model for urgency assessment
    const sentimentResult = await model(text);
    console.log("Sentiment analysis result:", sentimentResult);
    
    // For keyword extraction, we're using basic text matching
    // In a real implementation, this would use a dedicated NER model
    return legalDomains.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  } catch (error) {
    console.error("Error in keyword extraction:", error);
    return [];
  }
};

// Function to analyze legal issue using NLP and knowledge base
export const analyzeLegalIssue = async (
  text: string,
  model: Pipeline
): Promise<AnalysisResult> => {
  if (!text || !model) {
    throw new Error("Missing text or model for analysis");
  }

  try {
    // Extract keywords from the text
    const keywords = await extractLegalKeywords(text, model);
    console.log("Extracted keywords:", keywords);

    // Get sentiment for urgency assessment
    const sentimentResult = await model(text);
    const sentiment = sentimentResult[0]?.label || "NEUTRAL";
    const isUrgent = sentiment === "NEGATIVE";
    
    // Match issues to relevant laws using our knowledge base
    const relevantLaws = LegalKnowledge.findRelevantLaws(keywords);
    
    // Generate appropriate advice and steps based on identified issues
    const { advice, steps } = LegalKnowledge.generateAdvice(keywords, isUrgent);

    return {
      relevantLaws,
      advice,
      steps
    };
  } catch (error) {
    console.error("Error analyzing legal issue:", error);
    return {
      relevantLaws: [{
        name: "Analysis Error",
        section: "N/A",
        description: "There was an error analyzing your issue. Please try again or provide more details."
      }],
      advice: "We encountered a technical issue while analyzing your case. Please try again.",
      steps: ["Try submitting your issue again with more details"]
    };
  }
};
