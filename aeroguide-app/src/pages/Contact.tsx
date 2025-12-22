import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle } from 'lucide-react';

export function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Our team typically responds within 24 hours',
      detail: 'support@flylearn.com',
      action: 'Send Email',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm PST',
      detail: '+1 (800) 555-0199',
      action: 'Call Now',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      detail: 'Available during business hours',
      action: 'Start Chat',
    },
  ];

  const offices = [
    {
      city: 'Los Angeles',
      address: '1234 Aviation Blvd, Suite 500',
      state: 'Los Angeles, CA 90045',
      phone: '+1 (310) 555-0123',
      email: 'la@flylearn.com',
    },
    {
      city: 'New York',
      address: '789 Sky Tower, Floor 12',
      state: 'New York, NY 10001',
      phone: '+1 (212) 555-0456',
      email: 'ny@flylearn.com',
    },
    {
      city: 'Miami',
      address: '456 Ocean Drive, Suite 300',
      state: 'Miami, FL 33139',
      phone: '+1 (305) 555-0789',
      email: 'miami@flylearn.com',
    },
  ];

  const faqs = [
    {
      question: 'How do I choose the right flight school?',
      answer: 'Use our comparison tool to evaluate schools based on location, pricing, certifications, and student reviews. We also offer free consultation to help you make an informed decision.',
    },
    {
      question: 'Are the schools on your platform verified?',
      answer: 'Yes! All schools listed on FlyLearn undergo a rigorous verification process to ensure they meet FAA standards and maintain proper certifications.',
    },
    {
      question: 'Is there a fee to use FlyLearn?',
      answer: 'No, FlyLearn is completely free for students. We partner with flight schools to provide you with transparent information at no cost.',
    },
    {
      question: 'Can you help with financing options?',
      answer: 'Many of our partner schools offer financing options. Contact us or the school directly to learn about available payment plans and financial aid.',
    },
  ];

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

      {/* Contact Methods */}
      <section className="bg-white py-12 shadow-sm -mt-8 relative z-10 mx-4 sm:mx-6 lg:mx-8 rounded-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <method.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-2">{method.description}</p>
                <p className="font-semibold text-blue-600 mb-4">{method.detail}</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  {method.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    placeholder="+1 (555) 000-0000"
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
                    I agree to receive communications from FlyLearn and understand that I can unsubscribe at any time.
                  </label>
                </div>
                <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-6">
              {/* Business Hours */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3>Business Hours</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-900">
                    <strong>Note:</strong> We respond to all inquiries within 24 business hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3>Our Offices</h3>
                </div>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{office.city} Office</h4>
                      <div className="space-y-1 text-gray-600">
                        <p>{office.address}</p>
                        <p>{office.state}</p>
                        <p className="text-blue-600">{office.phone}</p>
                        <p className="text-blue-600">{office.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
                <h3 className="text-white mb-4">Need Immediate Help?</h3>
                <p className="text-blue-100 mb-6">
                  Our support team is standing by to assist you with any questions about flight schools or our platform.
                </p>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              View All FAQs →
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-200 h-96">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>Interactive Map Goes Here</p>
            <p className="text-sm">(Headquarters: Los Angeles, CA)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
