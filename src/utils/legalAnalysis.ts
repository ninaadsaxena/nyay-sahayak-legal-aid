
import { LegalKnowledge } from "./legalKnowledge";
import { pipeline } from "@huggingface/transformers";

export interface AnalysisResult {
  relevantLaws: { name: string; section: string; description: string }[];
  advice: string;
  steps: string[];
}

// Load proper Hugging Face model for legal text analysis
export const loadLegalModel = async () => {
  try {
    console.log("Loading legal analysis model...");
    
    // Use a proper sentiment analysis model from Hugging Face
    const model = await pipeline(
      "text-classification",
      "distilbert-base-uncased-finetuned-sst-2-english" // Using a sentiment model as baseline
    );
    
    return model;
  } catch (error) {
    console.error("Error loading legal analysis model:", error);
    
    // Fallback implementation for when model fails to load
    return {
      async classify(text: string) {
        console.log("Using fallback analysis for:", text);
        
        // More sophisticated fallback using regex patterns for legal issues
        const urgentPatterns = [
          /evict|threat|illegal|urgent|immediate|danger/i,
          /notice\s*period.*(\b[0-9]{1,2}\b)\s*days/i, // Short notice periods
          /security\s*deposit.*([1-9][0-9])\s*months/i, // Excessive deposits
          /landlord\s*(enter|access).*without\s*notice/i,
          /tenant\s*responsibility.*all\s*repairs/i
        ];
        
        const urgencyScore = urgentPatterns.reduce((score, pattern) => {
          return score + (pattern.test(text) ? 1 : 0);
        }, 0);
        
        return [{
          label: urgencyScore > 1 ? "NEGATIVE" : "NEUTRAL",
          score: urgencyScore > 1 ? 0.85 : 0.4
        }];
      }
    };
  }
};

// Extract legal keywords using NLP analysis
export const extractLegalKeywords = async (text: string, model: any): Promise<string[]> => {
  // Enhanced legal domain keywords based on actual Indian rental laws
  const legalDomains = [
    "eviction", "rent", "landlord", "tenant", "property", "lease", 
    "harassment", "deposit", "damage", "repair", "notice", "trespass",
    "maintenance", "utilities", "sublease", "termination", "renewal",
    "possession", "agreement", "license", "premises", "occupancy",
    "dispute", "litigation", "accommodation", "payment"
  ];

  try {
    // Get sentiment from model for urgency assessment
    const sentimentResult = await model.classify(text);
    console.log("Sentiment analysis result:", sentimentResult);
    
    // Advanced keyword extraction using regex patterns
    const keywords: string[] = [];
    
    // Extract keywords using pattern matching
    legalDomains.forEach(domain => {
      const regex = new RegExp(`\\b${domain}\\b|\\b${domain}s\\b|\\b${domain}ing\\b|\\b${domain}ed\\b`, 'i');
      if (regex.test(text)) {
        keywords.push(domain);
      }
    });
    
    // Add specialized extraction for monetary amounts
    const monetaryRegex = /Rs\.?\s*([0-9,]+)/gi;
    const monetaryMatches = text.match(monetaryRegex);
    if (monetaryMatches) {
      keywords.push("payment");
      if (text.toLowerCase().includes("deposit")) {
        keywords.push("deposit");
      }
    }
    
    // Extract time periods
    const timeRegex = /(\d+)\s*(day|month|year|week)s?/gi;
    const timeMatches = text.match(timeRegex);
    if (timeMatches) {
      if (text.toLowerCase().includes("notice")) {
        keywords.push("notice");
      }
      if (text.toLowerCase().includes("lease") || text.toLowerCase().includes("agreement")) {
        keywords.push("lease");
      }
    }
    
    return Array.from(new Set(keywords)); // Remove duplicates
  } catch (error) {
    console.error("Error in keyword extraction:", error);
    
    // Fallback to basic keyword matching
    return legalDomains.filter(keyword => 
      text.toLowerCase().includes(keyword)
    );
  }
};

// Function to analyze legal issue with enhanced NLP
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
