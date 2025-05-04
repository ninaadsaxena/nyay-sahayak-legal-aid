
// Legal knowledge base for Indian housing and rental laws
interface Law {
  name: string;
  section: string;
  description: string;
}

// Enhanced structured legal knowledge base based on actual Indian laws
const legalDatabase = {
  rentControl: {
    name: "Rent Control Act",
    sections: {
      "15(2)": "Prohibits eviction without proper notice and valid grounds as specified by law. The landlord must follow proper legal procedure and provide sufficient notice period.",
      "8(1)": "Controls the amount of rent that can be charged in certain areas. Rent increases are capped based on the standard rent determined by the Rent Controller.",
      "20": "Establishes procedures for determining fair rent. The Rent Controller can determine standard rent on application from tenant or landlord."
    }
  },
  ipc: {
    name: "Indian Penal Code",
    sections: {
      "448": "Punishment for house-trespass. Whoever commits house-trespass shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both.",
      "441": "Defines criminal trespass as entering property with intent to intimidate, insult or annoy. Any person who enters into or upon property in the possession of another with intent to commit an offence or to intimidate, insult or annoy is guilty of criminal trespass.",
      "503": "Criminal intimidation by threatening with injury to person, reputation or property. Punishable with imprisonment up to two years, or with fine, or with both."
    }
  },
  bns: {
    name: "Bhartiya Nyay Samhita",
    sections: {
      "318": "Protection against threats and intimidation. Prohibits any person from threatening another with any injury to his person, reputation or property, with intent to cause alarm.",
      "319": "Defines punishment for intimidation and coercion. Punishable with imprisonment which may extend to two years, or with fine, or with both.",
      "352": "Protection of right to peaceful possession of property. Protects against forcible dispossession of immovable property without due process of law."
    }
  },
  transferOfPropertyAct: {
    name: "Transfer of Property Act, 1882",
    sections: {
      "108": "Defines the rights and liabilities of lessor and lessee. The lessor is bound to disclose material defects in the property and keep the property in a condition fit for the purpose for which it was leased.",
      "111": "Determines when a lease of immovable property determines (ends). A lease of immovable property determines by efflux of time, happening of a specified event, breach of condition, or notice.",
      "106": "Requirements for proper notice to terminate tenancy. In the absence of a contract or local law, a lease of immovable property for agricultural or manufacturing purposes shall be deemed to be a lease from year to year, terminable on the part of either lessor or lessee by six months' notice."
    }
  },
  specificReliefAct: {
    name: "Specific Relief Act, 1963",
    sections: {
      "5": "Recovery of specific immovable property. A person entitled to the possession of specific immovable property may recover it in the manner provided by the Code of Civil Procedure.",
      "6": "Recovery of possession in case of dispossession. If any person is dispossessed without his consent of immovable property otherwise than in due course of law, he may recover possession by application to the Magistrate within six months from the date of dispossession.",
      "8": "Rights of the person deprived of a property. Any person deprived of immovable property may recover possession thereof in the manner prescribed by the Code of Civil Procedure."
    }
  },
  registrationAct: {
    name: "Registration Act, 1908",
    sections: {
      "17": "Documents of which registration is compulsory. Leases of immovable property from year to year, or for any term exceeding one year, or reserving a yearly rent must be registered.",
      "49": "Effect of non-registration of documents required to be registered. No document required by section 17 to be registered shall affect any immovable property or confer any power to adopt."
    }
  },
  landlordTenantBills: {
    name: "Model Tenancy Act, 2021",
    sections: {
      "11": "Rent Authority. Establishes the Rent Authority for regulating renting of premises and to protect the interests of landlords and tenants.",
      "13": "Security deposit limitations. Security deposit shall not exceed two months' rent for residential premises and six months' rent for non-residential premises.",
      "15": "Landlord's obligations. The landlord shall be responsible for structural repairs, whitewashing of walls, painting of doors and windows, etc.",
      "17": "Tenant's obligations. The tenant shall be responsible for minor repairs and maintenance, and shall not make any structural changes without written consent."
    }
  },
  stateSpecific: {
    name: "State Rental Laws",
    sections: {
      "Delhi": "Delhi Rent Control Act applies to premises with monthly rent below Rs. 3,500, providing tenant protection against arbitrary eviction and rent increases.",
      "Maharashtra": "Maharashtra Rent Control Act, 1999 applies to premises let for any purpose, with special provisions for Mumbai city with respect to rent increases and eviction grounds.",
      "Karnataka": "Karnataka Rent Act provides that security deposits shall not exceed ten months' rent in Bangalore city and three months' rent in other areas.",
      "TamilNadu": "Tamil Nadu Regulations of Rights and Responsibilities of Landlords and Tenants Act, 2017 requires written rental agreements to be registered with Rent Authority."
    }
  }
};

export class LegalKnowledge {
  // Find relevant laws based on extracted keywords with enhanced accuracy
  static findRelevantLaws(keywords: string[]): Law[] {
    if (!keywords || keywords.length === 0) {
      return [{
        name: "General Legal Information",
        section: "N/A",
        description: "Based on the information provided, we couldn't identify specific laws that apply to your situation. Please provide more details for a more accurate analysis."
      }];
    }

    const relevantLaws: Law[] = [];

    // Enhanced keyword matching for better law identification
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
      // Add Model Tenancy Act provisions
      relevantLaws.push({
        name: legalDatabase.landlordTenantBills.name,
        section: "Section 11",
        description: legalDatabase.landlordTenantBills.sections["11"]
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
      // Add Model Tenancy Act landlord entry provisions
      relevantLaws.push({
        name: legalDatabase.landlordTenantBills.name,
        section: "Section 15",
        description: "The landlord or property manager may enter the premises only with prior notice of at least 24 hours, except in emergency situations."
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
      relevantLaws.push({
        name: legalDatabase.landlordTenantBills.name,
        section: "Section 15",
        description: legalDatabase.landlordTenantBills.sections["15"]
      });
      relevantLaws.push({
        name: legalDatabase.landlordTenantBills.name,
        section: "Section 17",
        description: legalDatabase.landlordTenantBills.sections["17"]
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
        name: legalDatabase.landlordTenantBills.name,
        section: "Section 13",
        description: legalDatabase.landlordTenantBills.sections["13"]
      });
      
      // Add state-specific security deposit laws
      relevantLaws.push({
        name: legalDatabase.stateSpecific.name,
        section: "Karnataka Rent Act",
        description: legalDatabase.stateSpecific.sections["Karnataka"]
      });
    }
    
    if (keywords.some(k => ["agreement", "lease", "contract", "document"].includes(k))) {
      relevantLaws.push({
        name: legalDatabase.registrationAct.name,
        section: "Section 17",
        description: legalDatabase.registrationAct.sections["17"]
      });
      relevantLaws.push({
        name: legalDatabase.registrationAct.name,
        section: "Section 49",
        description: legalDatabase.registrationAct.sections["49"]
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

    // Generate advice based on keywords with enhanced legal accuracy
    if (keywords.some(k => ["evict", "eviction", "remove", "vacate", "leave"].includes(k))) {
      return {
        advice: "Based on your situation, under Section 15(2) of the Rent Control Act and various state tenancy laws, a landlord cannot evict you without following proper legal procedure. The Model Tenancy Act, 2021 (adopted by several states) requires landlords to apply to the Rent Authority with specific grounds for eviction. Even if your state hasn't adopted the Model Act, forced eviction without court order is illegal under Indian law.",
        steps: [
          "Document all communications with your landlord in writing (email, SMS, or registered letter)",
          "Send a formal notice citing Section 15(2) of the Rent Control Act and Section 106 of the Transfer of Property Act",
          "If threats continue, file a police complaint under IPC Section 448 and BNS Section 318",
          "Approach the Rent Control Tribunal or Civil Court in your district for an injunction against eviction",
          isUrgent ? "Consult with a housing rights lawyer immediately (contact State Legal Services Authority for free legal aid if needed)" : "Consider mediation through a legal aid service for quicker resolution"
        ]
      };
    } else if (keywords.some(k => ["repair", "fix", "maintenance", "damage", "broken"].includes(k))) {
      return {
        advice: "According to Section 108 of the Transfer of Property Act and Section 15 of the Model Tenancy Act (adopted by several states), landlords have legal obligations to maintain the property in habitable condition. Structural repairs, plumbing, electrical systems, and other essential maintenance are typically the landlord's responsibility, while minor day-to-day repairs may be the tenant's responsibility as per the rental agreement.",
        steps: [
          "Send a written notice to your landlord detailing the required repairs with photographs and videos as evidence",
          "Include a reasonable deadline (14-21 days) for completion of repairs citing Section 108 of Transfer of Property Act",
          "If repairs are not made, send a formal legal notice through a lawyer",
          "File a complaint with the local municipal authority regarding uninhabitable conditions",
          isUrgent ? "In case of dangerous conditions (electrical hazards, structural damage), seek temporary alternative accommodation and document all expenses" : "Consider approaching the Rent Authority or filing a petition in Civil Court for specific performance"
        ]
      };
    } else if (keywords.some(k => ["rent", "increase", "payment", "fee", "charge"].includes(k))) {
      return {
        advice: "Rent increases in India are regulated by state-specific Rent Control Acts. Under most state laws and the Model Tenancy Act, landlords must follow specific procedures for rent increases, typically providing advance notice (1-3 months). Many states limit annual rent increases to 10-15%. Your rent agreement terms will also govern permissible increases.",
        steps: [
          "Review your rental agreement for clauses regarding rent increases and notice periods",
          "Check the applicable Rent Control Act in your state for maximum permitted increases",
          "Request a written notice explaining the reason and calculation for the increase",
          "If the increase exceeds legal limits, prepare a written objection citing relevant sections of your state's Rent Control Act",
          isUrgent ? "Seek immediate legal counsel if the landlord is threatening eviction over rent disputes" : "Consider negotiating with the landlord for a mutually acceptable increase based on market rates in your area"
        ]
      };
    } else if (keywords.some(k => ["harass", "threat", "intimidate", "harassment", "intimidation"].includes(k))) {
      return {
        advice: "Landlord harassment and intimidation are illegal under the Indian Penal Code (Section 503) and the newer Bhartiya Nyay Samhita (Section 318). These protections apply regardless of your tenancy status. Common illegal tactics include cutting off utilities, removing doors/windows, threatening physical harm, or entering premises without permission—all of which are punishable criminal offenses.",
        steps: [
          "Maintain a detailed log of all instances of harassment with dates, times, descriptions, and witnesses",
          "Record conversations if legal in your state (check local laws on recording consent)",
          "Send a formal cease and desist letter to the landlord citing relevant IPC sections",
          "File a police complaint if the harassment continues, referencing IPC Section 503 and 448 (if landlord enters without permission)",
          isUrgent ? "Apply for a restraining order if you feel physically threatened by approaching the nearest Magistrate" : "Consult with a housing rights lawyer about potential civil action for emotional distress and harassment"
        ]
      };
    } else if (keywords.some(k => ["trespass", "enter", "entry", "access"].includes(k))) {
      return {
        advice: "Under Indian law, particularly IPC Section 441 and 448, unauthorized entry by your landlord is considered criminal trespass. The Model Tenancy Act (adopted by several states) specifically requires landlords to provide at least 24 hours' written notice before entering rented premises except in genuine emergencies. Your right to privacy and peaceful possession is legally protected.",
        steps: [
          "Send a written notice to your landlord asserting your right to privacy and peaceful possession",
          "Install door locks that cannot be opened with the landlord's key without your permission (with landlord's consent if required by lease)",
          "Document any instances of unauthorized entry with date, time, purpose, and evidence (photos or witness statements)",
          "File a police complaint if repeated violations occur, citing IPC Section 448",
          isUrgent ? "Consider installing security cameras with landlord's permission (if required by lease) to document intrusions" : "Consult a lawyer about potential breach of covenant of quiet enjoyment under Section 108 of Transfer of Property Act"
        ]
      };
    } else if (keywords.some(k => ["deposit", "security", "refund", "return", "money"].includes(k))) {
      return {
        advice: "Security deposit regulations vary by state in India. The Model Tenancy Act (adopted by several states) limits security deposits to two months' rent for residential properties. In Karnataka, deposits are capped at 10 months' rent in Bangalore and 3 months elsewhere. Landlords must return deposits within 1-2 months after lease termination, less legitimate deductions for damages beyond normal wear and tear.",
        steps: [
          "Review your lease agreement for specific deposit return timelines and conditions",
          "Conduct a thorough move-out inspection with the landlord and document the condition with photos/videos",
          "Request an itemized list of any deductions with supporting bills/invoices",
          "Send a formal demand letter if the deposit is not returned within the statutory period (typically 30-60 days)",
          isUrgent ? "File a complaint with the Rent Control Authority or Rent Tribunal in your district" : "Consider filing a consumer complaint under Consumer Protection Act if the amount is substantial"
        ]
      };
    } else if (keywords.some(k => ["agreement", "lease", "contract", "document"].includes(k))) {
      return {
        advice: "Under the Registration Act, 1908, all lease agreements for periods exceeding 11 months must be registered with the Sub-Registrar's office to be legally enforceable. Unregistered agreements for periods over 11 months cannot be presented as evidence in court proceedings. The Model Tenancy Act makes registration of rental agreements mandatory regardless of duration.",
        steps: [
          "Ensure your rental agreement is properly drafted with clear terms regarding rent, deposit, maintenance responsibilities, and notice period",
          "For agreements exceeding 11 months, get it registered with the Sub-Registrar's office (both landlord and tenant must be present)",
          "Keep multiple copies of the agreement signed by both parties",
          "Maintain receipts of all payments made including rent, deposit, and maintenance charges",
          "If your agreement isn't registered, consider getting a new registered agreement to ensure legal protection"
        ]
      };
    } else {
      return {
        advice: "Based on your input, we've identified some general rental issues. For more specific guidance tailored to your situation, please provide additional details about your tenancy relationship and the specific problems you're facing.",
        steps: [
          "Document all communications with your landlord in writing",
          "Review your rental agreement carefully for relevant clauses",
          "Research the specific rent control laws in your state",
          "Consider seeking free legal advice from the State Legal Services Authority",
          "Maintain records of all payments and receipts related to your tenancy"
        ]
      };
    }
  }
}
