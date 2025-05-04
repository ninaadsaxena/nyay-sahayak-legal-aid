
import { LegalKnowledge } from "./legalKnowledge";

export interface AnalysisResult {
  relevantLaws: { name: string; section: string; description: string }[];
  advice: string;
  steps: string[];
}

// Simplified model loading - avoids issues with Hugging Face's Pipeline typing
export const loadLegalModel = async () => {
  try {
    // Create a mock pipeline for text classification
    // In a production environment, this would use a proper model
    console.log("Loading legal analysis model...");
    return {
      // A simple mock function that returns sentiment scores
      async classify(text: string) {
        console.log("Analyzing text:", text);
        // Simple sentiment analysis based on keywords
        const negativeWords = ["evict", "threat", "illegal", "broken", "damage", "problem", "issue", "fear"];
        const urgencyScore = negativeWords.reduce((score, word) => {
          return score + (text.toLowerCase().includes(word) ? 1 : 0);
        }, 0);
        
        return [{
          label: urgencyScore > 2 ? "NEGATIVE" : "NEUTRAL",
          score: urgencyScore > 2 ? 0.85 : 0.4
        }];
      }
    };
  } catch (error) {
    console.error("Error loading legal analysis model:", error);
    throw new Error("Failed to load legal analysis model");
  }
};

// Extract legal keywords from text
export const extractLegalKeywords = async (text: string, model: any): Promise<string[]> => {
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
    const sentimentResult = await model.classify(text);
    console.log("Sentiment analysis result:", sentimentResult);
    
    // For keyword extraction, we're using basic text matching
    return legalDomains.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  } catch (error) {
    console.error("Error in keyword extraction:", error);
    return [];
  }
};

// Function to analyze legal issue 
export const analyzeLegalIssue = async (
  text: string,
  model: any
): Promise<AnalysisResult> => {
  if (!text || !model) {
    throw new Error("Missing text or model for analysis");
  }

  try {
    // Extract keywords from the text
    const keywords = await extractLegalKeywords(text, model);
    console.log("Extracted keywords:", keywords);

    // Get sentiment for urgency assessment
    const sentimentResult = await model.classify(text);
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
