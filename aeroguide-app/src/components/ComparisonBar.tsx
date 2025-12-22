import { X, ArrowRight } from 'lucide-react';

interface School {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  pricing: string;
  students: number;
  duration: string;
  certifications: string[];
}

interface ComparisonBarProps {
  selectedSchools: School[];
  onRemove: (id: number) => void;
  onCompare: () => void;
  onClear: () => void;
}

export function ComparisonBar({ selectedSchools, onRemove, onCompare, onClear }: ComparisonBarProps) {
  if (selectedSchools.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-600 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <span className="font-semibold text-gray-700 whitespace-nowrap">
              Compare Schools ({selectedSchools.length}/3)
            </span>
            <div className="flex gap-3">
              {selectedSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="font-medium text-blue-900">{school.name}</span>
                  <button
                    onClick={() => onRemove(school.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClear}
              className="text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
            <button
              onClick={onCompare}
              disabled={selectedSchools.length < 2}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Compare Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
