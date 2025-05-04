
// Legal knowledge base for Indian housing and rental laws
interface Law {
  name: string;
  section: string;
  description: string;
}

// Structured legal knowledge base
const legalDatabase = {
  rentControl: {
    name: "Rent Control Act",
    sections: {
      "15(2)": "Prohibits eviction without proper notice and valid grounds as specified by law.",
      "8(1)": "Controls the amount of rent that can be charged in certain areas.",
      "20": "Establishes procedures for determining fair rent."
    }
  },
  ipc: {
    name: "Indian Penal Code",
    sections: {
      "448": "Punishment for house-trespass. Applicable if landlord forcefully enters premises.",
      "441": "Defines criminal trespass as entering property with intent to intimidate, insult or annoy.",
      "503": "Criminal intimidation by threatening with injury to person, reputation or property."
    }
  },
  bns: {
    name: "Bhartiya Nyay Samhita",
    sections: {
      "318": "Protection against threats and intimidation.",
      "319": "Defines punishment for intimidation and coercion.",
      "352": "Protection of right to peaceful possession of property."
    }
  },
  transferOfPropertyAct: {
    name: "Transfer of Property Act",
    sections: {
      "108": "Defines the rights and liabilities of lessor and lessee.",
      "111": "Determines when a lease of immovable property determines (ends).",
      "106": "Requirements for proper notice to terminate tenancy."
    }
  },
  specificReliefAct: {
    name: "Specific Relief Act",
    sections: {
      "5": "Recovery of specific immovable property.",
      "6": "Recovery of possession in case of dispossession.",
      "8": "Rights of the person deprived of a property."
    }
  }
};

export class LegalKnowledge {
  // Find relevant laws based on extracted keywords
  static findRelevantLaws(keywords: string[]): Law[] {
    if (!keywords || keywords.length === 0) {
      return [{
        name: "General Legal Information",
        section: "N/A",
        description: "Based on the information provided, we couldn't identify specific laws that apply to your situation. Please provide more details for a more accurate analysis."
      }];
    }

    const relevantLaws: Law[] = [];

    // Match keywords to laws
    if (keywords.some(k => ["evict", "eviction", "remove", "vacate", "leave"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.rentControl.name,
        section: "Section 15(2)",
        description: legalDatabase.rentControl.sections["15(2)"]
      });
      relevantLaws.push({
        name: legalDatabase.transferOfPropertyAct.name,
        section: "Section 106",
        description: legalDatabase.transferOfPropertyAct.sections["106"]
      });
    }
    
    if (keywords.some(k => ["trespass", "enter", "entry", "access"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.ipc.name,
        section: "Section 448",
        description: legalDatabase.ipc.sections["448"]
      });
      relevantLaws.push({
        name: legalDatabase.ipc.name,
        section: "Section 441",
        description: legalDatabase.ipc.sections["441"]
      });
    }
    
    if (keywords.some(k => ["harass", "threat", "intimidate", "harassment", "intimidation"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.bns.name,
        section: "Section 318",
        description: legalDatabase.bns.sections["318"]
      });
      relevantLaws.push({
        name: legalDatabase.ipc.name,
        section: "Section 503",
        description: legalDatabase.ipc.sections["503"]
      });
    }
    
    if (keywords.some(k => ["repair", "fix", "maintenance", "damage", "broken"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.transferOfPropertyAct.name,
        section: "Section 108",
        description: legalDatabase.transferOfPropertyAct.sections["108"]
      });
    }
    
    if (keywords.some(k => ["rent", "increase", "payment", "fee", "charge"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.rentControl.name,
        section: "Section 8(1)",
        description: legalDatabase.rentControl.sections["8(1)"]
      });
      relevantLaws.push({
        name: legalDatabase.rentControl.name,
        section: "Section 20",
        description: legalDatabase.rentControl.sections["20"]
      });
    }
    
    if (keywords.some(k => ["deposit", "security", "refund", "return", "money"].includes(k))) {
      relevantLaws.push({
        name: "Various State Rent Control Acts",
        section: "Security Deposit Provisions",
        description: "State-specific regulations govern security deposits, typically limiting them to 2-3 months' rent and mandating return within 15-30 days after lease termination."
      });
    }

    return relevantLaws.length > 0 ? relevantLaws : [{
      name: "General Legal Information",
      section: "N/A",
      description: "Based on the information provided, we couldn't identify specific laws that apply to your situation. Please provide more details for a more accurate analysis."
    }];
  }

  // Generate advice and steps based on identified issues
  static generateAdvice(keywords: string[], isUrgent: boolean): { advice: string; steps: string[] } {
    if (!keywords || keywords.length === 0) {
      return {
        advice: "Based on the information provided, we couldn't identify specific legal issues. Please provide more details about your situation for a more accurate analysis.",
        steps: ["Provide more detailed information about your housing or rental issue"]
      };
    }

    // Generate advice based on keywords
    if (keywords.some(k => ["evict", "eviction", "remove", "vacate", "leave"].includes(k))) {
      return {
        advice: "Based on your situation, the landlord cannot evict you without following proper legal procedure as mandated by Section 15(2) of the Rent Control Act. Threats of forceful eviction are illegal under multiple provisions of Indian law.",
        steps: [
          "Document all communications with your landlord in writing",
          "Send a formal notice citing Section 15(2) of the Rent Control Act and Section 106 of the Transfer of Property Act",
          "If threats continue, file a police complaint under IPC Section 448 and BNS Section 318",
          "Approach the Rent Control Tribunal in your district for an injunction against eviction",
          isUrgent ? "Consult with a housing rights lawyer immediately" : "Consider mediation through a legal aid service for quicker resolution"
        ]
      };
    } else if (keywords.some(k => ["repair", "fix", "maintenance", "damage", "broken"].includes(k))) {
      return {
        advice: "Your landlord has legal obligations to maintain the property in habitable condition. Section 108 of the Transfer of Property Act outlines these responsibilities clearly.",
        steps: [
          "Send a written notice to your landlord detailing the required repairs with photographs",
          "Include a reasonable deadline (14 days) for completion of repairs citing Section 108",
          "If repairs are not made, send a formal legal notice through a lawyer",
          "File a complaint with the local municipal authority regarding uninhabitable conditions",
          isUrgent ? "In case of dangerous conditions, seek temporary alternative accommodation and document all expenses" : "Consider withholding rent in an escrow account after legal consultation"
        ]
      };
    } else if (keywords.some(k => ["rent", "increase", "payment", "fee", "charge"].includes(k))) {
      return {
        advice: "Rent increases in India are regulated by state-specific Rent Control Acts. The landlord must follow specific procedures and cannot increase rent beyond the statutory limits, typically 10-15% every 3-5 years depending on your state.",
        steps: [
          "Review your rental agreement for clauses regarding rent increases",
          "Check the applicable Rent Control Act in your state for maximum permitted increases",
          "Request a written notice explaining the reason for the increase",
          "If the increase exceeds legal limits, file a petition with the Rent Controller",
          isUrgent ? "Seek immediate legal counsel if the landlord is threatening eviction over rent disputes" : "Consider negotiating with the landlord for a mutually acceptable increase"
        ]
      };
    } else if (keywords.some(k => ["harass", "threat", "intimidate", "harassment", "intimidation"].includes(k))) {
      return {
        advice: "Landlord harassment and intimidation are illegal under the Indian Penal Code (Section 503) and the newer Bhartiya Nyay Samhita (Section 318). You have strong legal protections against such behavior.",
        steps: [
          "Maintain a detailed log of all instances of harassment with dates, times, and descriptions",
          "Record conversations if legal in your state (check local laws on recording consent)",
          "Send a formal cease and desist letter to the landlord citing relevant IPC sections",
          "File a police complaint if the harassment continues, referencing IPC Section 503",
          isUrgent ? "Apply for a restraining order if you feel physically threatened" : "Consult with a housing rights lawyer about potential civil action for emotional distress"
        ]
      };
    } else if (keywords.some(k => ["trespass", "enter", "entry", "access"].includes(k))) {
      return {
        advice: "Unauthorized entry by your landlord is considered criminal trespass under IPC Section 441 and 448. Landlords must provide proper notice (typically 24-48 hours) before entering your rented premises except in genuine emergencies.",
        steps: [
          "Send a written notice to your landlord reminding them of your right to privacy and peaceful possession",
          "Install door locks that cannot be opened with the landlord's key without your permission",
          "Document any instances of unauthorized entry with date, time and purpose if known",
          "File a police complaint if repeated violations occur, citing IPC Section 448",
          isUrgent ? "Consider installing security cameras with landlord's permission (if required by lease)" : "Consult a lawyer about potential breach of covenant of quiet enjoyment"
        ]
      };
    } else if (keywords.some(k => ["deposit", "security", "refund", "return", "money"].includes(k))) {
      return {
        advice: "Security deposit regulations vary by state in India, but generally landlords must return deposits within 15-30 days after lease termination, less any legitimate deductions for damages beyond normal wear and tear.",
        steps: [
          "Review your lease agreement for specific deposit return timelines",
          "Conduct a thorough move-out inspection with the landlord and document the condition",
          "Request an itemized list of any deductions with supporting documentation",
          "Send a formal demand letter if the deposit is not returned within the statutory period",
          isUrgent ? "File a complaint with the Rent Control Authority in your district" : "Consider small claims court or consumer forum if the amount is not substantial"
        ]
      };
    } else {
      return {
        advice: "Based on your input, we've identified some general rental issues. For more specific guidance, please provide additional details about your situation.",
        steps: [
          "Document all communications with your landlord in writing",
          "Review your rental agreement carefully for relevant clauses",
          "Research the specific rent control laws in your state",
          "Consider seeking free legal advice from a legal aid society",
          "Maintain records of all payments and receipts related to your tenancy"
        ]
      };
    }
  }
}
