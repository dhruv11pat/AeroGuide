import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Phone, Mail, Globe, CheckCircle, ArrowLeft, Loader2, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSchoolById } from '../api/schools';
import type { FlyingSchool } from '../../utils/example-schools';
import { useAuth } from '../context/AuthContext';
import { createInquiry } from '../api/inquiry';

export function Schools() {
  const navigate = useNavigate();
  const { schoolId } = useParams<{ schoolId: string }>();
  const { isAuthenticated, user } = useAuth();
  const [school, setSchool] = useState<FlyingSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    course: '',
    reviewText: ''
  });
  const [inquiryFormData, setInquiryFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  useEffect(() => {
    const loadSchool = async () => {
      if (!schoolId) return;
      
      setLoading(true);
      setError(false);
      try {
        const data = await fetchSchoolById(schoolId);
        if (data) {
          setSchool(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading school:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [schoolId]);

  const handleOpenReviewModal = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewFormData({ rating: 5, course: '', reviewText: '' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual review submission to backend
    console.log('Review submitted:', {
      schoolId,
      user: user?.email,
      ...reviewFormData
    });
    alert('Thank you for your review! It will be visible after approval.');
    handleCloseReviewModal();
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return;

    setIsSubmittingInquiry(true);
    try {
      // Combine first and last name
      const name = `${inquiryFormData.firstName} ${inquiryFormData.lastName}`.trim();
      
      // Prepare data according to API schema
      const inquiryData = {
        name,
        email: inquiryFormData.email,
        phone: inquiryFormData.phone || undefined,
        message: inquiryFormData.message,
        inquiry_type: 'general'
      };

      // Include program/subject in message if selected
      const messageWithSubject = inquiryFormData.subject 
        ? `Subject: ${inquiryFormData.subject}\n\n${inquiryFormData.message}`
        : inquiryFormData.message;
      
      inquiryData.message = messageWithSubject;

      const response = await createInquiry(schoolId, inquiryData);
      
      if (response) {
        alert('Thank you for your inquiry! We will get back to you soon.');
        // Reset form
        setInquiryFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">School Not Found</h2>
          <p className="text-gray-600 mb-6">The school you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Schools
            </button>
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
                {school.description || `Established in ${school.established}, ${school.name} has been a premier flight training institution. We pride ourselves on providing exceptional aviation education with a perfect blend of modern technology and time-tested teaching methods.`}
              </p>
              <p className="text-gray-700 mb-6">
                Our comprehensive training programs are designed to take you from your first discovery flight to a professional aviation career. With a fleet of {school.fleetSize} well-maintained aircraft and {school.instructors} experienced FAA-certified instructors, we ensure personalized attention and the highest safety standards.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mb-1">{school.established ? new Date().getFullYear() - school.established : '30+'}+</div>
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

              {school.features && school.features.length > 0 && (
                <>
                  <h3 className="mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {school.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Programs Section */}
            {school.programs && school.programs.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="mb-6">Training Programs</h2>
                <div className="space-y-4">
                  {school.programs.map((program, index) => (
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
            )}

            {/* Reviews Section */}
            {school.testimonials && school.testimonials.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2>Student Reviews</h2>
                  <button
                    onClick={handleOpenReviewModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Write a Review
                  </button>
                </div>
                <div className="space-y-6">
                  {school.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
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
                      <p className="text-blue-600 mt-2">Course: {testimonial.course}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                  View All {school.reviews} Reviews
                </button>
              </div>
            )}
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
                      <p className="text-gray-600">{school.fullAddress || school.location}</p>
                    </div>
                  </div>
                  {school.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{school.phone}</p>
                      </div>
                    </div>
                  )}
                  {school.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{school.email}</p>
                      </div>
                    </div>
                  )}
                  {school.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <p className="text-gray-600">{school.website}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="mb-4">Request Information</h3>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={inquiryFormData.firstName}
                        onChange={(e) => setInquiryFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={inquiryFormData.lastName}
                        onChange={(e) => setInquiryFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={inquiryFormData.email}
                      onChange={(e) => setInquiryFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={inquiryFormData.phone}
                      onChange={(e) => setInquiryFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Subject *</label>
                    <select 
                      required
                      value={inquiryFormData.subject}
                      onChange={(e) => setInquiryFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                    >
                      <option value="">Select program interest</option>
                      {school.programs && school.programs.length > 0 ? (
                        school.programs.map((program, index) => (
                          <option key={index} value={program.name}>{program.name}</option>
                        ))
                      ) : (
                        <>
                          <option value="Private Pilot License">Private Pilot License</option>
                          <option value="Commercial Pilot License">Commercial Pilot License</option>
                          <option value="Instrument Rating">Instrument Rating</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={inquiryFormData.message}
                      onChange={(e) => setInquiryFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                      placeholder="Tell us about your aviation goals..."
                    ></textarea>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="inquiry-consent"
                      className="mt-1"
                      required
                    />
                    <label htmlFor="inquiry-consent" className="text-gray-600 text-sm">
                      I agree to receive communications from {school.name} and understand that I can unsubscribe at any time.
                    </label>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmittingInquiry && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmittingInquiry ? 'Sending...' : 'Send Inquiry'}
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Write a Review for {school?.name}</h2>
              <button
                onClick={handleCloseReviewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= reviewFormData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">({reviewFormData.rating} stars)</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Course Completed *</label>
                <select
                  required
                  value={reviewFormData.course}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select a course</option>
                  {school?.programs && school.programs.length > 0 ? (
                    school.programs.map((program, index) => (
                      <option key={index} value={program.name}>{program.name}</option>
                    ))
                  ) : (
                    <>
                      <option value="Private Pilot License">Private Pilot License</option>
                      <option value="Commercial Pilot License">Commercial Pilot License</option>
                      <option value="Instrument Rating">Instrument Rating</option>
                      <option value="Multi-Engine Rating">Multi-Engine Rating</option>
                      <option value="Flight Instructor">Flight Instructor</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Review *</label>
                <textarea
                  required
                  value={reviewFormData.reviewText}
                  onChange={(e) => setReviewFormData(prev => ({ ...prev, reviewText: e.target.value }))}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Share your experience with this flight school..."
                  minLength={50}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Minimum 50 characters</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Posting as:</h3>
                <p className="text-gray-600">{user?.name} ({user?.email})</p>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseReviewModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
