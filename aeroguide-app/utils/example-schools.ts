export interface TrainingProgram {
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface Testimonial {
  id: number | string;
  name: string;
  rating: number;
  text: string;
  date: string;
  course: string;
}

export interface FlyingSchool {
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
  // Extended fields for detail page
  fullAddress?: string;
  phone?: string;
  email?: string;
  website?: string;
  established?: number;
  fleetSize?: number;
  instructors?: number;
  description?: string;
  programs?: TrainingProgram[];
  testimonials?: Testimonial[];
  features?: string[];
}
  
export const flyingSchools: FlyingSchool[] = [
  {
    id: 1,
    name: 'Skyward Aviation Academy',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 234,
    imageUrl: 'https://images.unsplash.com/photo-1758485363383-e82089de4d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGFpcmNyYWZ0JTIwZmx5aW5nfGVufDF8fHx8MTc2NjMzODM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$8,500',
    students: 500,
    duration: '6-12 months',
    certifications: ['PPL', 'CPL', 'IR'],
    fullAddress: '1234 Aviation Blvd, Los Angeles, CA 90045',
    phone: '+1 (310) 555-0101',
    email: 'info@skywardaviation.com',
    website: 'www.skywardaviation.com',
    established: 2010,
    fleetSize: 25,
    instructors: 18,
    description: 'Premier flight training school in Southern California with state-of-the-art facilities and experienced instructors.',
    programs: [
      { name: 'Private Pilot License', description: 'Foundation of your aviation career', duration: '3-6 months', price: '$8,500' },
      { name: 'Instrument Rating', description: 'Fly in all weather conditions', duration: '2-4 months', price: '$7,200' },
      { name: 'Commercial Pilot License', description: 'Start your professional career', duration: '4-8 months', price: '$15,000' }
    ],
    testimonials: [
      { id: 1, name: 'John Davis', rating: 5, text: 'Excellent training program with professional instructors!', date: '2024-12-15', course: 'PPL' },
      { id: 2, name: 'Sarah Miller', rating: 5, text: 'Amazing experience, highly recommended!', date: '2024-11-20', course: 'CPL' }
    ],
    features: ['Modern Aircraft Fleet', 'Experienced CFIs', 'Flexible Scheduling', 'Accelerated Programs', 'Job Placement Assistance']
  },
  {
    id: 2,
    name: 'Elite Flight Training Center',
    location: 'Miami, FL',
    rating: 4.8,
    reviews: 189,
    imageUrl: 'https://images.unsplash.com/photo-1764547168268-1c8b531bce9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxvdCUyMHRyYWluaW5nfGVufDF8fHx8MTc2NjMzODM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$9,200',
    students: 350,
    duration: '8-14 months',
    certifications: ['PPL', 'CPL', 'IR', 'CFI'],
    fullAddress: '5678 Airport Rd, Miami, FL 33142',
    phone: '+1 (305) 555-0202',
    email: 'contact@eliteflight.com',
    website: 'www.eliteflight.com',
    established: 2008,
    fleetSize: 30,
    instructors: 22,
    description: 'Florida\'s leading aviation training center offering comprehensive pilot programs.',
    programs: [
      { name: 'Zero to Hero Package', description: 'Complete training from beginner to CFI', duration: '12-18 months', price: '$65,000' },
      { name: 'Private Pilot License', description: 'Start your flying journey', duration: '3-5 months', price: '$9,200' }
    ],
    testimonials: [
      { id: 1, name: 'Michael Chen', rating: 5, text: 'Best investment in my aviation career!', date: '2024-12-01', course: 'Zero to Hero' }
    ],
    features: ['Year-Round Flying Weather', 'Multi-Engine Training', 'Career Counseling', 'Student Housing Available']
  },
  {
    id: 3,
    name: 'Horizon Professional Flight School',
    location: 'Dallas, TX',
    rating: 4.7,
    reviews: 156,
    imageUrl: 'https://images.unsplash.com/photo-1761599598140-40292b372d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmlhdGlvbiUyMHNjaG9vbHxlbnwxfHx8fDE3NjYzMzgzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$7,800',
    students: 420,
    duration: '6-10 months',
    certifications: ['PPL', 'IR'],
    fullAddress: '9012 Flight Way, Dallas, TX 75261',
    phone: '+1 (214) 555-0303',
    email: 'fly@horizonflight.com',
    website: 'www.horizonflight.com',
    established: 2015,
    fleetSize: 20,
    instructors: 15,
    description: 'Professional flight training in the heart of Texas with competitive pricing.',
    programs: [
      { name: 'Private Pilot License', description: 'Affordable path to your license', duration: '3-6 months', price: '$7,800' },
      { name: 'Instrument Rating', description: 'Advanced flying skills', duration: '2-4 months', price: '$6,500' }
    ],
    testimonials: [
      { id: 1, name: 'Emily Rodriguez', rating: 5, text: 'Great value and excellent instructors!', date: '2024-11-10', course: 'PPL' }
    ],
    features: ['Competitive Pricing', 'Glass Cockpit Aircraft', 'Ground School Included', 'Weekend Classes']
  },
  {
    id: 4,
    name: 'Premier Aviation Institute',
    location: 'Phoenix, AZ',
    rating: 4.9,
    reviews: 298,
    imageUrl: 'https://images.unsplash.com/photo-1509541206217-cde45c41aa6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGNvY2twaXR8ZW58MXx8fHwxNzY2MzM4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$10,500',
    students: 650,
    duration: '12-18 months',
    certifications: ['PPL', 'CPL', 'IR', 'CFI', 'CFII'],
    fullAddress: '3456 Runway Dr, Phoenix, AZ 85034',
    phone: '+1 (602) 555-0404',
    email: 'admin@premieraviation.com',
    website: 'www.premieraviation.com',
    established: 2005,
    fleetSize: 40,
    instructors: 35,
    description: 'Arizona\'s largest and most respected aviation training institute with comprehensive programs.',
    programs: [
      { name: 'Professional Pilot Program', description: 'Complete career training', duration: '12-18 months', price: '$75,000' },
      { name: 'Private Pilot License', description: 'Begin your journey', duration: '3-6 months', price: '$10,500' },
      { name: 'Instructor Ratings', description: 'Become a CFI', duration: '2-3 months', price: '$8,000' }
    ],
    testimonials: [
      { id: 1, name: 'David Thompson', rating: 5, text: 'World-class training facility and staff!', date: '2024-12-05', course: 'Professional Pilot' },
      { id: 2, name: 'Lisa Wong', rating: 5, text: 'Helped me achieve my dream of becoming a pilot!', date: '2024-10-22', course: 'CPL' }
    ],
    features: ['Largest Fleet in AZ', 'Part 141 Certified', 'Airline Partnerships', 'Simulator Training', 'VA Benefits Accepted']
  },
  {
    id: 5,
    name: 'Coastal Flight Academy',
    location: 'San Diego, CA',
    rating: 4.6,
    reviews: 142,
    imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0fGVufDF8fHx8MTc2NjMzODM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$8,900',
    students: 280,
    duration: '7-12 months',
    certifications: ['PPL', 'CPL', 'IR'],
    fullAddress: '7890 Coastal Hwy, San Diego, CA 92101',
    phone: '+1 (619) 555-0505',
    email: 'info@coastalflight.com',
    website: 'www.coastalflight.com',
    established: 2012,
    fleetSize: 18,
    instructors: 12,
    description: 'Scenic coastal flying with beautiful year-round weather for optimal training.',
    programs: [
      { name: 'Private Pilot License', description: 'Learn to fly by the coast', duration: '3-6 months', price: '$8,900' },
      { name: 'Commercial Pilot License', description: 'Turn pro in paradise', duration: '6-10 months', price: '$18,500' }
    ],
    testimonials: [
      { id: 1, name: 'Robert Garcia', rating: 5, text: 'Beautiful location and great training!', date: '2024-11-15', course: 'PPL' }
    ],
    features: ['Ocean Views', 'Perfect Weather', 'Tailwheel Training', 'Seaplane Ratings Available']
  },
  {
    id: 6,
    name: 'Rotorcraft Training Solutions',
    location: 'Las Vegas, NV',
    rating: 4.8,
    reviews: 167,
    imageUrl: 'https://images.unsplash.com/photo-1733087539736-5a39b4d7db8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY2MzM4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pricing: '$12,000',
    students: 190,
    duration: '8-15 months',
    certifications: ['PPL(H)', 'CPL(H)', 'CFI(H)'],
    fullAddress: '2468 Helicopter Ln, Las Vegas, NV 89119',
    phone: '+1 (702) 555-0606',
    email: 'fly@rotorcrafttraining.com',
    website: 'www.rotorcrafttraining.com',
    established: 2013,
    fleetSize: 15,
    instructors: 10,
    description: 'Specialized helicopter training center with experienced rotorcraft instructors.',
    programs: [
      { name: 'Private Helicopter License', description: 'Learn rotorcraft basics', duration: '3-6 months', price: '$12,000' },
      { name: 'Commercial Helicopter License', description: 'Professional helicopter pilot', duration: '6-12 months', price: '$25,000' }
    ],
    testimonials: [
      { id: 1, name: 'James Martinez', rating: 5, text: 'Best helicopter training in Nevada!', date: '2024-10-30', course: 'PPL(H)' }
    ],
    features: ['Helicopter Specialists', 'Turbine Training', 'Mountain Flying', 'Tours & Charters Experience']
  }
];
  