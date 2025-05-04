
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

// Sample Indian States
const INDIAN_STATES = [
  { id: "all", name: "All States" },
  { id: "delhi", name: "Delhi" },
  { id: "maharashtra", name: "Maharashtra" },
  { id: "karnataka", name: "Karnataka" },
  // Extend as needed
];

// ... we slightly enhance the law data to demonstrate state-based laws ...
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
        content: "A tenant shall not be evicted except in accordance with the provisions of this Act. The landlord must provide proper notice and valid grounds as specified in subsection (2)."
      }
    ]
  },
  {
    id: 2,
    category: "property",
    states: ["all", "karnataka"],
    title: "Transfer of Property Act, 1882",
    sections: [
      {
        id: "sec108",
        title: "Section 108: Rights and Liabilities of Lessor and Lessee",
        content: "This section defines the rights and liabilities of landlords and tenants in the absence of a contract or local usage. It covers maintenance responsibilities, rent payment terms, and termination conditions."
      }
    ]
  },
  {
    id: 3,
    category: "rental",
    states: ["delhi"],
    title: "Delhi Rent Control Act",
    sections: [
      {
        id: "delhi1",
        title: "Section 6: Limitation on Rent Increase",
        content: "For Delhi, the Rent Control Act restricts yearly rent increases to a maximum of 10%. Additional tenant protections apply."
      }
    ]
  },
  {
    id: 4,
    category: "rental",
    states: ["maharashtra"],
    title: "Maharashtra Rent Control Act",
    sections: [
      {
        id: "mumbai1",
        title: "Section 12: Landlord's Duties and Tenant Protections",
        content: "For Maharashtra, tenants cannot be evicted without court order citing valid reasons according to the state's guidelines."
      }
    ]
  }
  // Add more as desired
];

const lawCategories = [
  { id: "rental", name: "Rental Laws" },
  { id: "property", name: "Property Rights" },
  { id: "eviction", name: "Eviction Process" },
  { id: "disputes", name: "Dispute Resolution" },
];

const LawReference = () => {
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
      return t(key);
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
            {safeT("Law Reference Title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {safeT("Law Reference Subtitle")}
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
                {safeT(
                  "Looking for more comprehensive legal information? Download our complete guide to housing and rental laws."
                )}
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
