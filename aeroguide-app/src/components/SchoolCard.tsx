import { MapPin, Star, Clock, Users, Award, Check } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface SchoolCardProps {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  pricing: string;
  students: number;
  duration: string;
  certifications: string[];
  isSelected?: boolean;
  onCompareToggle: () => void;
  compareDisabled?: boolean;
}

export function SchoolCard({
  name,
  location,
  rating,
  reviews,
  imageUrl,
  pricing,
  students,
  duration,
  certifications,
  isSelected = false,
  onCompareToggle,
  compareDisabled = false,
}: SchoolCardProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-600' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">({reviews})</span>
        </div>
        {isSelected && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Check className="w-4 h-4" />
            <span>Selected</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="mb-2">{name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{students}+ students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">Certifications:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <span className="text-gray-500">Starting from</span>
            <div className="text-blue-600 font-semibold">{pricing}</div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>

        {/* Compare Button */}
        <button
          onClick={onCompareToggle}
          disabled={compareDisabled && !isSelected}
          className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
            isSelected
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-600 hover:bg-blue-200'
              : compareDisabled
              ? 'bg-gray-100 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
          }`}
        >
          {isSelected ? '✓ Added to Compare' : 'Add to Compare'}
        </button>
      </div>
    </div>
  );
}
