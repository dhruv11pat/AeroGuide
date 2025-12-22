import { Target, Users, Award, Plane, Heart, Shield, Rocket, CheckCircle } from 'lucide-react';

export function About() {
  const stats = [
    { value: '150+', label: 'Partner Schools' },
    { value: '10K+', label: 'Students Placed' },
    { value: '50+', label: 'Cities Covered' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect aspiring pilots with the best flight training schools, making aviation education accessible and transparent for everyone.',
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'To be the world\'s most trusted platform for aviation education, fostering a new generation of skilled and passionate pilots.',
    },
    {
      icon: Shield,
      title: 'Our Commitment',
      description: 'We ensure every listed school meets rigorous safety and quality standards, giving you peace of mind in your aviation journey.',
    },
  ];

  const team = [
    {
      name: 'Captain James Morrison',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      bio: '25 years of aviation experience, former airline captain',
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Expert in aviation education with 15+ years in the industry',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Building innovative solutions for aviation training',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director of Student Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Dedicated to helping students achieve their aviation dreams',
    },
  ];

  const milestones = [
    { year: '2015', event: 'FlyLearn founded with 10 partner schools' },
    { year: '2017', event: 'Reached 1,000 students placed milestone' },
    { year: '2019', event: 'Expanded to 50+ cities nationwide' },
    { year: '2021', event: 'Launched mobile app and comparison tools' },
    { year: '2023', event: 'Achieved 150+ partner schools network' },
    { year: '2025', event: 'Serving 10,000+ aspiring pilots annually' },
  ];

  const features = [
    'Verified school credentials and certifications',
    'Transparent pricing and program information',
    'Real student reviews and ratings',
    'Personalized school recommendations',
    'Free consultation and guidance',
    'Direct connection with school admissions',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Plane className="w-12 h-12" />
          </div>
          <h1 className="text-white mb-6">About AeroGuide</h1>
          <p className="max-w-3xl mx-auto text-blue-100 mb-8">
            We're on a mission to make aviation education accessible to everyone. Since 2015, we've been connecting aspiring pilots with top-rated flight schools across the nation.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-sm -mt-8 relative z-10 mx-4 sm:mx-6 lg:mx-8 rounded-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  FlyLearn was born from a simple observation: finding the right flight school was unnecessarily complicated. Our founder, Captain James Morrison, experienced this firsthand when helping his daughter choose a flight training program.
                </p>
                <p>
                  He envisioned a platform where all the information would be transparent, reviews would be authentic, and students could make informed decisions about their aviation education. What started as a small directory of 10 schools has grown into the nation's leading flight school discovery platform.
                </p>
                <p>
                  Today, we're proud to partner with over 150 flight schools, helping thousands of students annually take their first step toward a career in aviation. Our commitment to quality, transparency, and student success remains at the heart of everything we do.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
                alt="Aviation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop"
                alt="Flight Training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6">Why Choose FlyLearn?</h2>
              <p className="text-gray-700 mb-6">
                We understand that choosing a flight school is a significant decision. That's why we've built a platform that puts you first, providing all the tools and information you need to make the right choice.
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A decade of growth, innovation, and helping students achieve their aviation dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="text-blue-400 font-semibold mb-2">{milestone.year}</div>
                <p className="text-gray-300">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate aviation professionals dedicated to your success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-white mb-4">Ready to Start Your Aviation Journey?</h2>
          <p className="mb-8 text-blue-100">
            Join thousands of students who have found their perfect flight school through FlyLearn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Explore Schools
            </button>
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold border-2 border-white">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
