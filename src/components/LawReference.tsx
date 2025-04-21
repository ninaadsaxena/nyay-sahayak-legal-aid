
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, FileText } from "lucide-react";

const lawCategories = [
  { id: "rental", name: "Rental Laws" },
  { id: "property", name: "Property Rights" },
  { id: "eviction", name: "Eviction Process" },
  { id: "disputes", name: "Dispute Resolution" },
];

const lawReferences = [
  {
    id: 1,
    category: "rental",
    title: "Rent Control Act",
    sections: [
      {
        id: "sec15",
        title: "Section 15: Protection Against Eviction",
        content: "A tenant shall not be evicted except in accordance with the provisions of this Act. The landlord must provide proper notice and valid grounds as specified in subsection (2)."
      },
      {
        id: "sec18",
        title: "Section 18: Rent Increase Limitations",
        content: "No landlord shall increase the rent of any premises by more than 10% within a period of 12 months, unless structural alterations or improvements have been made to the premises."
      }
    ]
  },
  {
    id: 2,
    category: "property",
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
    category: "eviction",
    title: "Indian Penal Code",
    sections: [
      {
        id: "sec441",
        title: "Section 441: Criminal Trespass",
        content: "Whoever enters into or upon property in the possession of another with intent to commit an offence or to intimidate, insult or annoy any person in possession of such property, or having lawfully entered into or upon such property, unlawfully remains there with intent thereby to intimidate, insult or annoy any such person, or with intent to commit an offence, is said to commit 'criminal trespass'."
      },
      {
        id: "sec448",
        title: "Section 448: Punishment for House-trespass",
        content: "Whoever commits house-trespass shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both."
      }
    ]
  },
  {
    id: 4,
    category: "disputes",
    title: "Bhartiya Nyay Samhita",
    sections: [
      {
        id: "sec318",
        title: "Section 318: Protection Against Threats and Intimidation",
        content: "This section provides protection against threats, intimidation, and coercion used to illegally dispossess a person from property they legally occupy."
      }
    ]
  },
  {
    id: 5,
    category: "rental",
    title: "Registration Act, 1908",
    sections: [
      {
        id: "sec17",
        title: "Section 17: Documents for which Registration is Compulsory",
        content: "Lease agreements for periods exceeding one year or reserving a yearly rent must be registered under this Act to be legally valid and admissible as evidence in court."
      }
    ]
  }
];

const LawReference = () => {
  const [selectedCategory, setSelectedCategory] = useState("rental");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const filteredLaws = lawReferences.filter((law) => {
    // Filter by category
    const categoryMatch = law.category === selectedCategory;
    
    // Filter by search query
    if (!searchQuery) return categoryMatch;
    
    const queryLower = searchQuery.toLowerCase();
    const titleMatch = law.title.toLowerCase().includes(queryLower);
    const sectionMatch = law.sections.some(
      (section) => 
        section.title.toLowerCase().includes(queryLower) || 
        section.content.toLowerCase().includes(queryLower)
    );
    
    return categoryMatch && (titleMatch || sectionMatch);
  });

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  return (
    <section id="law-reference" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Law Reference
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Access comprehensive information on housing and rental laws in India
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search laws, sections, or keywords..."
                    className="pl-10 input-field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="button-primary">
                  Search Laws
                </Button>
              </div>
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
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {lawCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    {filteredLaws.length === 0 ? (
                      <div className="text-center py-10">
                        <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700">
                          No laws found matching your search
                        </h3>
                        <p className="text-gray-500 mt-2">
                          Try adjusting your search terms or browse another category
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
                Looking for more comprehensive legal information? Download our complete guide to housing and rental laws.
              </p>
              <Button variant="outline" className="mt-3">
                <BookOpen className="mr-2 h-4 w-4" />
                Download Complete Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawReference;
