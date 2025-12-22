export interface FlyingSchool {
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
    },
  ];
  