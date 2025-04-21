
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Users, Star, MapPin, Phone, Calendar, Filter } from "lucide-react";

const lawyers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    specialization: "Rental Disputes & Eviction",
    rating: 4.9,
    experience: 12,
    location: "Delhi NCR",
    consultationFee: "₹1,500",
    availability: "Available Today",
    languages: ["English", "Hindi"],
    description: "Specialized in tenant rights and rental dispute resolution with experience in handling over 500 cases related to rental agreements and eviction matters."
  },
  {
    id: 2,
    name: "Adv. Rahul Verma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    specialization: "Property Law & Documentation",
    rating: 4.7,
    experience: 8,
    location: "Mumbai",
    consultationFee: "₹2,000",
    availability: "Available Tomorrow",
    languages: ["English", "Hindi", "Marathi"],
    description: "Expert in property documentation, sale deeds, and land acquisition laws. Helped numerous clients resolve complex property ownership disputes."
  },
  {
    id: 3,
    name: "Adv. Sneha Reddy",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    specialization: "Tenant Rights & Housing",
    rating: 4.8,
    experience: 15,
    location: "Bangalore",
    consultationFee: "₹1,800",
    availability: "Available in 3 days",
    languages: ["English", "Kannada", "Telugu"],
    description: "Housing law expert with focus on protecting tenant rights. Previously worked with housing rights NGOs and has strong expertise in rent control laws."
  },
  {
    id: 4,
    name: "Adv. Arjun Mehta",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    specialization: "Land Disputes & Registration",
    rating: 4.6,
    experience: 10,
    location: "Hyderabad",
    consultationFee: "₹1,200",
    availability: "Available Today",
    languages: ["English", "Hindi", "Telugu"],
    description: "Specializes in resolving land boundary disputes and title issues. Has extensive experience with agricultural land conversion and urban property matters."
  }
];

const LawyerConnect = () => {
  const [filters, setFilters] = useState({
    specialization: "",
    location: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    if (filters.specialization && !lawyer.specialization.includes(filters.specialization)) {
      return false;
    }
    if (filters.location && lawyer.location !== filters.location) {
      return false;
    }
    return true;
  });

  return (
    <section id="lawyer-connect" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Connect with Specialized Lawyers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get professional legal assistance from lawyers specializing in housing and rental laws
          </p>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter Lawyers
          </Button>
          <p className="text-gray-600">
            Showing {filteredLawyers.length} lawyers available for consultation
          </p>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Specializations</option>
                  <option value="Rental Disputes">Rental Disputes</option>
                  <option value="Property Law">Property Law</option>
                  <option value="Tenant Rights">Tenant Rights</option>
                  <option value="Land Disputes">Land Disputes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="input-field"
                >
                  <option value="">All Locations</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img src={lawyer.image} alt={lawyer.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <CardTitle>{lawyer.name}</CardTitle>
                    <CardDescription className="text-primary-600">
                      {lawyer.specialization}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">{lawyer.description}</p>
                
                <div className="flex flex-wrap gap-y-3">
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-secondary" />
                    <span>{lawyer.rating} Rating</span>
                  </div>
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{lawyer.experience} Years Exp.</span>
                  </div>
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="w-1/2 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{lawyer.availability}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Consultation Fee</p>
                    <p className="font-medium text-primary-900">{lawyer.consultationFee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Languages</p>
                    <p className="text-sm">{lawyer.languages.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button className="flex-1 button-primary" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button className="flex-1" variant="outline" size="sm">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LawyerConnect;
