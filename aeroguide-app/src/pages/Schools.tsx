import { MapPin, Star, Clock, Users, Phone, Mail, Globe, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Schools() {
  const navigate = useNavigate();
  const school = {
    id: 1,
    name: 'Skyward Aviation Academy',
    location: 'Los Angeles, CA',
    fullAddress: '1234 Airport Boulevard, Los Angeles, CA 90045',
    rating: 4.9,
    reviews: 234,
    imageUrl: 'https://images.unsplash.com/photo-1758485363383-e82089de4d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGFpcmNyYWZ0JTIwZmx5aW5nfGVufDF8fHx8MTc2NjMzODM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$8,500',
    students: 500,
    duration: '6-12 months',
    certifications: ['PPL', 'CPL', 'IR', 'Multi-Engine', 'CFI'],
    phone: '+1 (310) 555-0123',
    email: 'info@skywardaviation.com',
    website: 'www.skywardaviation.com',
    established: '1995',
    fleetSize: 24,
    instructors: 18,
  };

  const features = [
    'Modern fleet of aircraft',
    'Experienced FAA certified instructors',
    'Flexible scheduling',
    'Ground school included',
    'Simulator training available',
    'Job placement assistance',
    'VA approved',
    'Financing options available',
  ];

  const programs = [
    {
      name: 'Private Pilot License (PPL)',
      duration: '3-6 months',
      price: '$8,500',
      description: 'Learn the fundamentals of flight and earn your private pilot license.',
    },
    {
      name: 'Commercial Pilot License (CPL)',
      duration: '6-9 months',
      price: '$45,000',
      description: 'Advance your skills and become a professional commercial pilot.',
    },
    {
      name: 'Instrument Rating (IR)',
      duration: '2-4 months',
      price: '$12,000',
      description: 'Master instrument flight rules and fly in all weather conditions.',
    },
    {
      name: 'Multi-Engine Rating',
      duration: '1-2 months',
      price: '$8,500',
      description: 'Expand your capabilities with multi-engine aircraft certification.',
    },
  ];

  const testimonials = [
    {
      name: 'John Mitchell',
      date: '2 months ago',
      rating: 5,
      text: 'Excellent flight school! The instructors are knowledgeable and patient. I earned my PPL here and couldn\'t be happier with the training I received.',
    },
    {
      name: 'Sarah Chen',
      date: '3 months ago',
      rating: 5,
      text: 'Professional, well-maintained aircraft and top-notch instruction. The staff really cares about your success. Highly recommend!',
    },
    {
      name: 'David Rodriguez',
      date: '5 months ago',
      rating: 4,
      text: 'Great experience overall. The scheduling was flexible and the facilities are modern. A bit pricey but worth it for the quality of training.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={school.imageUrl}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 text-white p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white mb-4">{school.name}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{school.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{school.rating}</span>
                <span>({school.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{school.students}+ students trained</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-4">About {school.name}</h2>
              <p className="text-gray-700 mb-4">
                Established in {school.established}, Skyward Aviation Academy has been a premier flight training institution for over 30 years. We pride ourselves on providing exceptional aviation education with a perfect blend of modern technology and time-tested teaching methods.
              </p>
              <p className="text-gray-700 mb-6">
                Our comprehensive training programs are designed to take you from your first discovery flight to a professional aviation career. With a fleet of {school.fleetSize} well-maintained aircraft and {school.instructors} experienced FAA-certified instructors, we ensure personalized attention and the highest safety standards.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mb-1">30+</div>
                  <p className="text-gray-600">Years</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mb-1">{school.fleetSize}</div>
                  <p className="text-gray-600">Aircraft</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mb-1">{school.instructors}</div>
                  <p className="text-gray-600">Instructors</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mb-1">98%</div>
                  <p className="text-gray-600">Pass Rate</p>
                </div>
              </div>

              <h3 className="mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-6">Training Programs</h2>
              <div className="space-y-4">
                {programs.map((program, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-blue-600">{program.name}</h3>
                      <span className="text-blue-600 font-semibold">{program.price}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{program.description}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                View All {school.reviews} Reviews
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">{school.fullAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{school.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{school.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <p className="text-gray-600">{school.website}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="mb-4">Request Information</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Program Interest</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500">
                      <option>Private Pilot License</option>
                      <option>Commercial Pilot License</option>
                      <option>Instrument Rating</option>
                      <option>Multi-Engine Rating</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="Tell us about your aviation goals..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Send Inquiry
                  </button>
                </form>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
                <h3 className="text-white mb-4">Ready to Start?</h3>
                <p className="text-blue-100 mb-4">
                  Schedule a discovery flight today and experience the thrill of aviation!
                </p>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold mb-3">
                  Book Discovery Flight
                </button>
                <button className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
