import { useState } from 'react';
import { Search, Menu, Plane, MapPin } from 'lucide-react';
import { SchoolCard } from '../components/SchoolCard.tsx';
import { ComparisonModal } from '../components/ComparisonModal.tsx';
import { ComparisonBar } from '../components/ComparisonBar.tsx';
import { AnimatedCounter } from '../components/util-components/AnimatedCounter.tsx';
import { flyingSchools , type FlyingSchool} from '../../utils/example-schools';
import Footer from '../components/Footer.tsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSchools, setSelectedSchools] = useState<FlyingSchool[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const MAX_COMPARE = 3;

  const filteredSchools = flyingSchools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || school.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  const handleCompareToggle = (school: FlyingSchool) => {
    setSelectedSchools((prev) => {
      const isSelected = prev.some((s) => s.id === school.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== school.id);
      } else {
        if (prev.length >= MAX_COMPARE) {
          return prev;
        }
        return [...prev, school];
      }
    });
  };

  const handleRemoveFromCompare = (id: number) => {
    setSelectedSchools((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = () => {
    setSelectedSchools([]);
  };

  const handleCompare = () => {
    setShowComparisonModal(true);
  };

  const handleCloseModal = () => {
    setShowComparisonModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white mb-6">
              Find Your Perfect Flight School
            </h2>
            <p className="mb-8 text-blue-100">
              Discover the best aviation training centers across the country. Compare schools, read reviews, and start your journey to becoming a pilot.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by school name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent outline-none text-gray-900 cursor-pointer"
                >
                  <option value="all">All Locations</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="TX">Texas</option>
                  <option value="AZ">Arizona</option>
                  <option value="NV">Nevada</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter 
                value="150+" 
                duration={2}
                className="text-blue-600 mb-2 text-3xl md:text-4xl font-bold"
              />
              <p className="text-gray-600">Flight Schools</p>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                value="5,000+" 
                duration={2}
                className="text-blue-600 mb-2 text-3xl md:text-4xl font-bold"
              />
              <p className="text-gray-600">Certified Pilots</p>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                value="98%" 
                duration={2}
                className="text-blue-600 mb-2 text-3xl md:text-4xl font-bold"
              />
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                value="50+" 
                duration={2}
                className="text-blue-600 mb-2 text-3xl md:text-4xl font-bold"
              />
              <p className="text-gray-600">Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Featured Flight Schools</h2>
              <p className="text-gray-600">
                Showing {filteredSchools.length} of {flyingSchools.length} schools
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-gray-600">Sort by:</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500">
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.map((school) => (
              <SchoolCard 
                key={school.id} 
                {...school} 
                isSelected={selectedSchools.some((s) => s.id === school.id)}
                onCompareToggle={() => handleCompareToggle(school)}
                compareDisabled={selectedSchools.length >= MAX_COMPARE}
              />
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No schools found matching your criteria. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Start Your Aviation Career?</h2>
          <p className="mb-8 text-blue-100">
            Join thousands of aspiring pilots who have found their perfect flight school through FlyLearn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Browse All Schools
            </button>
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold border-2 border-white">
              List Your School
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Comparison Bar */}
      <ComparisonBar
        selectedSchools={selectedSchools}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearAll}
        onCompare={handleCompare}
      />

      {/* Comparison Modal */}
      {showComparisonModal && (
        <ComparisonModal
          schools={selectedSchools}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
