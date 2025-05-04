
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

// Enhanced Indian States list with more complete coverage
const INDIAN_STATES = [
  { id: "all", name: "All States" },
  { id: "delhi", name: "Delhi" },
  { id: "maharashtra", name: "Maharashtra" },
  { id: "karnataka", name: "Karnataka" },
  { id: "tamilnadu", name: "Tamil Nadu" },
  { id: "kerala", name: "Kerala" },
  { id: "uttarpradesh", name: "Uttar Pradesh" },
  { id: "westbengal", name: "West Bengal" },
  { id: "gujarat", name: "Gujarat" },
  { id: "punjab", name: "Punjab" },
  { id: "haryana", name: "Haryana" },
];

// Enhanced law data with more comprehensive and actual Indian rental and housing laws
const lawReferences = [
  {
    id: 1,
    category: "rental",
    states: ["all", "delhi", "maharashtra"],
    title: "Rent Control Act",
    sections: [
      {
        id: "sec15",
        title: "Section 15: Protection Against Eviction",
        content: "A tenant shall not be evicted except in accordance with the provisions of this Act. The landlord must provide proper notice and valid grounds as specified in subsection (2). Valid grounds include: non-payment of rent, subletting without permission, nuisance or damage to property, requirement of premises by landlord for personal use, and structural repairs/demolition."
      },
      {
        id: "sec8",
        title: "Section 8: Fixation of Standard Rent",
        content: "The Rent Controller may, upon an application made by the tenant or the landlord, fix the standard rent of any premises. The standard rent shall be determined based on the cost of construction, market value of the land, amenities provided, and other relevant factors."
      }
    ]
  },
  {
    id: 2,
    category: "property",
    states: ["all"],
    title: "Transfer of Property Act, 1882",
    sections: [
      {
        id: "sec108",
        title: "Section 108: Rights and Liabilities of Lessor and Lessee",
        content: "This section defines the rights and liabilities of landlords and tenants in the absence of a contract or local usage. The lessor is bound to disclose any material defect in the property, to maintain the property in a condition fit for the purpose for which it was leased, and to ensure the tenant's quiet possession. The lessee is bound to pay rent, maintain the property in good condition (except for reasonable wear and tear), and give notice of any proceeding against the property."
      },
      {
        id: "sec106",
        title: "Section 106: Duration of Lease",
        content: "In the absence of a contract or local law, a lease of immovable property shall be deemed to be a lease from month to month, terminable by 15 days' notice. For agricultural or manufacturing purposes, it shall be deemed to be a lease from year to year, terminable by 6 months' notice."
      },
      {
        id: "sec111",
        title: "Section 111: Determination of Lease",
        content: "A lease of immovable property determines (ends) by: efflux of time, happening of a specified event, notice of termination, completion of purpose, express surrender, implied surrender, forfeiture, or acquisition of superior title."
      }
    ]
  },
  {
    id: 3,
    category: "rental",
    states: ["delhi"],
    title: "Delhi Rent Control Act, 1958",
    sections: [
      {
        id: "delhi1",
        title: "Section 6: Limitation on Rent Increase",
        content: "For Delhi, the Rent Control Act restricts yearly rent increases to a maximum of 10% for residential premises and 15% for non-residential premises when the property is more than 3 years old. Additional tenant protections apply."
      },
      {
        id: "delhi2",
        title: "Section 14: Protection of Tenants Against Eviction",
        content: "In Delhi, a tenant cannot be evicted except on specific grounds mentioned in this section, such as non-payment of rent, misuse of premises, requirement by landlord for personal use, etc. The landlord must obtain an order of eviction from the Rent Controller."
      },
      {
        id: "delhi3",
        title: "Section 19: Recovery of Possession for Repairs and Rebuilding",
        content: "If the landlord requires possession for carrying out repairs or rebuilding, they must file an application before the Rent Controller. The tenant shall be entitled to be placed back in occupation after the completion of repairs/reconstruction."
      }
    ]
  },
  {
    id: 4,
    category: "rental",
    states: ["maharashtra"],
    title: "Maharashtra Rent Control Act, 1999",
    sections: [
      {
        id: "mumbai1",
        title: "Section 12: Landlord's Duties and Tenant Protections",
        content: "For Maharashtra, tenants cannot be evicted without court order citing valid reasons according to the state's guidelines. The landlord must maintain essential services like water supply, electricity, etc."
      },
      {
        id: "mumbai2",
        title: "Section 7: Standard Rent and Permitted Increases",
        content: "In Maharashtra, the standard rent is determined based on the cost of construction and market value of land. Rent increases are restricted to 4% per annum for premises let before 1st October 2001 and as per agreement for premises let after this date."
      },
      {
        id: "mumbai3",
        title: "Section 31: Repairs of Premises",
        content: "The landlord is responsible for keeping the premises in good and tenantable repair. If the landlord neglects to make repairs, the tenant may carry out the repairs after giving notice and deduct the cost from the rent."
      }
    ]
  },
  {
    id: 5,
    category: "rental",
    states: ["karnataka"],
    title: "Karnataka Rent Act, 2001",
    sections: [
      {
        id: "kar1",
        title: "Section 8: Security Deposit Limitation",
        content: "In Karnataka, security deposits shall not exceed ten months' rent in Bangalore city and three months' rent in other areas of the state. The deposit must be refunded within one month of vacating the premises, after deducting any amounts due."
      },
      {
        id: "kar2",
        title: "Section 21: Eviction of Tenants",
        content: "A tenant in Karnataka can be evicted only on grounds specified in this section, such as non-payment of rent for three consecutive months, subletting without permission, nuisance, or requirement by the landlord for personal use."
      }
    ]
  },
  {
    id: 6,
    category: "property",
    states: ["all"],
    title: "Registration Act, 1908",
    sections: [
      {
        id: "reg1",
        title: "Section 17: Documents for which Registration is Compulsory",
        content: "Leases of immovable property from year to year, or for any term exceeding one year, or reserving a yearly rent, must be registered. Unregistered documents shall not affect any immovable property nor be received as evidence of any transaction affecting such property."
      },
      {
        id: "reg2",
        title: "Section 49: Effect of Non-registration",
        content: "No document required to be registered under Section 17 shall affect any immovable property, or confer any power to adopt, or be received as evidence of any transaction affecting such property, unless it has been registered."
      }
    ]
  },
  {
    id: 7,
    category: "eviction",
    states: ["all"],
    title: "Code of Civil Procedure, 1908",
    sections: [
      {
        id: "ccp1",
        title: "Order XXI, Rule 97-106: Procedure for Eviction",
        content: "These rules prescribe the procedure for eviction and delivery of possession of immovable property. The court may order removal of any person refusing to vacate the property and may use necessary force for execution of the decree."
      },
      {
        id: "ccp2",
        title: "Section 9: Courts to try all civil suits unless barred",
        content: "The courts shall have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred. Tenancy disputes are civil in nature and can be tried by civil courts if not expressly barred."
      }
    ]
  },
  {
    id: 8,
    category: "disputes",
    states: ["all"],
    title: "Model Tenancy Act, 2021",
    sections: [
      {
        id: "mta1",
        title: "Section 4: Tenancy Agreement",
        content: "Every agreement relating to a tenancy shall be in writing and shall be registered with the Rent Authority. The agreement must specify the rent, period of tenancy, terms of revision of rent, and responsibilities for maintenance and repairs."
      },
      {
        id: "mta2",
        title: "Section 11: Establishment of Rent Authority",
        content: "Each district shall have a Rent Authority to be appointed by the District Collector with the prior approval of the state/UT government. The Rent Authority shall register the tenancy agreement and resolve any disputes between landlord and tenant."
      },
      {
        id: "mta3",
        title: "Section 13: Security Deposit",
        content: "The security deposit shall not exceed two months' rent for residential premises and six months' rent for non-residential premises. It shall be refunded to the tenant within one month of vacating the premises after making deductions, if any."
      },
      {
        id: "mta4",
        title: "Section 21: Eviction and Recovery of Possession",
        content: "The landlord shall have the right to make an application to the Rent Court for eviction and recovery of possession on grounds specified in the Act, such as non-payment of rent, misuse of premises, requirement for own occupation, etc."
      }
    ]
  }
];

const lawCategories = [
  { id: "rental", name: "Rental Laws" },
  { id: "property", name: "Property Rights" },
  { id: "eviction", name: "Eviction Process" },
  { id: "disputes", name: "Dispute Resolution" },
];

const LawReference = () => {
  // Handle potential undefined t function from useTranslation
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("rental");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState("all");

  const filteredLaws = lawReferences.filter((law) => {
    const categoryMatch = law.category === selectedCategory;
    const stateMatch = law.states.includes(selectedState) || law.states.includes("all") || selectedState === "all";

    if (!searchQuery) return categoryMatch && stateMatch;

    const queryLower = searchQuery.toLowerCase();
    const titleMatch = law.title.toLowerCase().includes(queryLower);
    const sectionMatch = law.sections.some(
      (section) =>
        section.title.toLowerCase().includes(queryLower) ||
        section.content.toLowerCase().includes(queryLower)
    );
    return categoryMatch && stateMatch && (titleMatch || sectionMatch);
  });

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  // Fallback translation function in case i18n context is not available
  const safeT = (key: string): string => {
    try {
      return t(key) || key;
    } catch (error) {
      console.warn("Translation failed, using fallback for:", key);
      return key;
    }
  };

  return (
    <section id="law-reference" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {safeT("Law Reference Database")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {safeT("Access comprehensive information about housing and rental laws across different states in India")}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-grow w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={safeT("Search laws, sections, or keywords...")}
                  className="pl-10 input-field w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="border rounded px-3 py-2 text-sm bg-white text-primary-900"
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                aria-label={safeT("Select State")}
              >
                {INDIAN_STATES.map(state => (
                  <option value={state.id} key={state.id}>
                    {safeT(state.name)}
                  </option>
                ))}
              </select>
              <Button className="button-primary">
                {safeT("Search Laws")}
              </Button>
            </div>
            <div className="p-6">
              <Tabs defaultValue="rental" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  {lawCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {safeT(category.name)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {lawCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    {filteredLaws.length === 0 ? (
                      <div className="text-center py-10">
                        <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700">
                          {safeT("No laws found matching your search")}
                        </h3>
                        <p className="text-gray-500 mt-2">
                          {safeT("Try adjusting your search terms or browse another category")}
                        </p>
                      </div>
                    ) : (
                      filteredLaws.map((law) => (
                        <div key={law.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-primary-50 p-4 border-b border-primary-100 flex items-center">
                            <FileText className="h-5 w-5 text-primary mr-3" />
                            <h3 className="font-medium text-lg text-primary-900">
                              {law.title}
                            </h3>
                          </div>
                          <div className="p-4 space-y-4">
                            {law.sections.map((section) => (
                              <div key={section.id} className="border border-gray-200 rounded-md">
                                <button
                                  onClick={() => toggleSection(section.id)}
                                  className="w-full text-left flex justify-between items-center p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                >
                                  <h4 className="font-medium text-gray-800">
                                    {section.title}
                                  </h4>
                                  <svg
                                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                                      expandedSection === section.id ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>
                                {expandedSection === section.id && (
                                  <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                                    <p className="text-gray-700">{section.content}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                {safeT("Looking for more comprehensive legal information? Download our complete guide to housing and rental laws.")}
              </p>
              <Button variant="outline" className="mt-3">
                <BookOpen className="mr-2 h-4 w-4" />
                {safeT("Download Complete Guide")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawReference;
