import { X, Star, MapPin, Clock, Users, Award } from 'lucide-react';

interface School {
  id: number | string;
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

interface ComparisonModalProps {
  schools: School[];
  onClose: () => void;
}

export function ComparisonModal({ schools, onClose }: ComparisonModalProps) {
  const comparisonCategories = [
    {
      title: 'Basic Information',
      rows: [
        { label: 'School Name', key: 'name' as keyof School },
        { label: 'Location', key: 'location' as keyof School, icon: MapPin },
        { label: 'Rating', key: 'rating' as keyof School, icon: Star, format: (val: number) => `${val} / 5.0` },
        { label: 'Reviews', key: 'reviews' as keyof School, format: (val: number) => `${val} reviews` },
      ],
    },
    {
      title: 'Training Details',
      rows: [
        { label: 'Duration', key: 'duration' as keyof School, icon: Clock },
        { label: 'Students Trained', key: 'students' as keyof School, icon: Users, format: (val: number) => `${val}+` },
        { label: 'Starting Price', key: 'pricing' as keyof School },
      ],
    },
    {
      title: 'Certifications',
      rows: [
        { label: 'Available Certifications', key: 'certifications' as keyof School, icon: Award },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0 bg-white rounded-t-xl">
          <div>
            <h2 className="mb-1">School Comparison</h2>
            <p className="text-gray-600">Compare features and details side by side</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <div className="min-w-full">
            {/* School Headers */}
            <div className="grid gap-4 p-6 bg-gray-50 border-b border-gray-200" style={{ gridTemplateColumns: `minmax(200px, 250px) repeat(${schools.length}, minmax(250px, 1fr))` }}>
              <div className="font-semibold text-gray-700"></div>
              {schools.map((school) => (
                <div key={school.id} className="text-center min-w-0">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="mb-2 truncate">{school.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{school.rating}</span>
                    </div>
                    <img
                      src={school.imageUrl}
                      alt={school.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {comparisonCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="bg-blue-50 px-6 py-3 border-b border-gray-200">
                  <h4 className="text-blue-900">{category.title}</h4>
                </div>
                {category.rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid gap-4 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{ gridTemplateColumns: `minmax(200px, 250px) repeat(${schools.length}, minmax(250px, 1fr))` }}
                  >
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                      {row.icon && <row.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                      <span className="truncate">{row.label}</span>
                    </div>
                    {schools.map((school) => (
                      <div key={school.id} className="text-center min-w-0">
                        {row.key === 'certifications' ? (
                          <div className="flex flex-wrap gap-2 justify-center">
                            {(school[row.key] as string[]).map((cert: string, index: number) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="font-medium break-words">
                            {row.format
                              ? row.format(school[row.key] as number)
                              : school[row.key]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Action Row */}
            <div className="grid gap-4 p-6 bg-gray-50" style={{ gridTemplateColumns: `minmax(200px, 250px) repeat(${schools.length}, minmax(250px, 1fr))` }}>
              <div></div>
              {schools.map((school) => (
                <div key={school.id} className="text-center min-w-0">
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600">
              Comparing {schools.length} flight schools
            </p>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
