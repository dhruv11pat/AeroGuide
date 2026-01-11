import { Phone, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-6">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-blue-100 mb-8">
            Have questions? We're here to help you find the perfect flight school and support you throughout your aviation journey.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {/* Phone Number Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="mb-2">Call Us</h2>
              <p className="text-gray-600 mb-4">Our team is available to assist you</p>
              <a 
                href="tel:+919876543210"
                className="text-2xl font-semibold text-blue-600 hover:text-blue-700"
              >
                +91 79842 02917
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-blue-600" />
                <h2>Send Us a Message</h2>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Subject *</label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>School Recommendation</option>
                    <option>Technical Support</option>
                    <option>Partnership Opportunity</option>
                    <option>Feedback/Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="consent" className="text-gray-600">
                    I agree to receive communications from AeroGuide and understand that I can unsubscribe at any time.
                  </label>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
