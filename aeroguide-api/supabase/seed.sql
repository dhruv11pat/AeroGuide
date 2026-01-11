-- AeroGuide Seed Data
-- Run this after creating the schema to populate initial data

-- Insert sample schools
INSERT INTO schools (name, location, full_address, rating, reviews_count, image_url, pricing, students, duration, certifications, phone, email, website, established, fleet_size, instructors, description, features, is_active)
VALUES
(
  'Skyward Aviation Academy',
  'Los Angeles, CA',
  '1234 Aviation Blvd, Los Angeles, CA 90045',
  4.9,
  234,
  'https://images.unsplash.com/photo-1758485363383-e82089de4d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGFpcmNyYWZ0JTIwZmx5aW5nfGVufDF8fHx8MTc2NjMzODM4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  '$8,500',
  500,
  '6-12 months',
  ARRAY['PPL', 'CPL', 'IR'],
  '+1 (310) 555-0101',
  'info@skywardaviation.com',
  'https://www.skywardaviation.com',
  2010,
  25,
  18,
  'Premier flight training school in Southern California with state-of-the-art facilities and experienced instructors.',
  ARRAY['Modern Aircraft Fleet', 'Experienced CFIs', 'Flexible Scheduling', 'Accelerated Programs', 'Job Placement Assistance'],
  true
),
(
  'Elite Flight Training Center',
  'Miami, FL',
  '5678 Airport Rd, Miami, FL 33142',
  4.8,
  189,
  'https://images.unsplash.com/photo-1764547168268-1c8b531bce9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxvdCUyMHRyYWluaW5nfGVufDF8fHx8MTc2NjMzODM4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  '$9,200',
  350,
  '8-14 months',
  ARRAY['PPL', 'CPL', 'IR', 'CFI'],
  '+1 (305) 555-0202',
  'contact@eliteflight.com',
  'https://www.eliteflight.com',
  2008,
  30,
  22,
  'Florida''s leading aviation training center offering comprehensive pilot programs.',
  ARRAY['Year-Round Flying Weather', 'Multi-Engine Training', 'Career Counseling', 'Student Housing Available'],
  true
),
(
  'Horizon Professional Flight School',
  'Dallas, TX',
  '9012 Flight Way, Dallas, TX 75261',
  4.7,
  156,
  'https://images.unsplash.com/photo-1761599598140-40292b372d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmlhdGlvbiUyMHNjaG9vbHxlbnwxfHx8fDE3NjYzMzgzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  '$7,800',
  420,
  '6-10 months',
  ARRAY['PPL', 'IR'],
  '+1 (214) 555-0303',
  'fly@horizonflight.com',
  'https://www.horizonflight.com',
  2015,
  20,
  15,
  'Professional flight training in the heart of Texas with competitive pricing.',
  ARRAY['Competitive Pricing', 'Glass Cockpit Aircraft', 'Ground School Included', 'Weekend Classes'],
  true
),
(
  'Premier Aviation Institute',
  'Phoenix, AZ',
  '3456 Runway Dr, Phoenix, AZ 85034',
  4.9,
  298,
  'https://images.unsplash.com/photo-1509541206217-cde45c41aa6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGNvY2twaXR8ZW58MXx8fHwxNzY2MzM4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  '$10,500',
  650,
  '12-18 months',
  ARRAY['PPL', 'CPL', 'IR', 'CFI', 'CFII'],
  '+1 (602) 555-0404',
  'admin@premieraviation.com',
  'https://www.premieraviation.com',
  2005,
  40,
  35,
  'Arizona''s largest and most respected aviation training institute with comprehensive programs.',
  ARRAY['Largest Fleet in AZ', 'Part 141 Certified', 'Airline Partnerships', 'Simulator Training', 'VA Benefits Accepted'],
  true
),
(
  'Coastal Flight Academy',
  'San Diego, CA',
  '7890 Coastal Hwy, San Diego, CA 92101',
  4.6,
  142,
  'https://images.unsplash.com/photo-1474302770737-173ee21bab63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0fGVufDF8fHx8MTc2NjMzODM4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  '$8,900',
  280,
  '7-12 months',
  ARRAY['PPL', 'CPL', 'IR'],
  '+1 (619) 555-0505',
  'info@coastalflight.com',
  'https://www.coastalflight.com',
  2012,
  18,
  12,
  'Scenic coastal flying with beautiful year-round weather for optimal training.',
  ARRAY['Ocean Views', 'Perfect Weather', 'Tailwheel Training', 'Seaplane Ratings Available'],
  true
),
(
  'Rotorcraft Training Solutions',
  'Las Vegas, NV',
  '2468 Helicopter Ln, Las Vegas, NV 89119',
  4.8,
  167,
  'https://images.unsplash.com/photo-1733087539736-5a39b4d7db8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY2MzM4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  '$12,000',
  190,
  '8-15 months',
  ARRAY['PPL(H)', 'CPL(H)', 'CFI(H)'],
  '+1 (702) 555-0606',
  'fly@rotorcrafttraining.com',
  'https://www.rotorcrafttraining.com',
  2013,
  15,
  10,
  'Specialized helicopter training center with experienced rotorcraft instructors.',
  ARRAY['Helicopter Specialists', 'Turbine Training', 'Mountain Flying', 'Tours & Charters Experience'],
  true
);

-- Insert training programs for each school
-- Get school IDs and insert programs

DO $$
DECLARE
  skyward_id UUID;
  elite_id UUID;
  horizon_id UUID;
  premier_id UUID;
  coastal_id UUID;
  rotorcraft_id UUID;
BEGIN
  SELECT id INTO skyward_id FROM schools WHERE name = 'Skyward Aviation Academy';
  SELECT id INTO elite_id FROM schools WHERE name = 'Elite Flight Training Center';
  SELECT id INTO horizon_id FROM schools WHERE name = 'Horizon Professional Flight School';
  SELECT id INTO premier_id FROM schools WHERE name = 'Premier Aviation Institute';
  SELECT id INTO coastal_id FROM schools WHERE name = 'Coastal Flight Academy';
  SELECT id INTO rotorcraft_id FROM schools WHERE name = 'Rotorcraft Training Solutions';

  -- Skyward Aviation Academy programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (skyward_id, 'Private Pilot License', 'Foundation of your aviation career', '3-6 months', '$8,500'),
    (skyward_id, 'Instrument Rating', 'Fly in all weather conditions', '2-4 months', '$7,200'),
    (skyward_id, 'Commercial Pilot License', 'Start your professional career', '4-8 months', '$15,000');

  -- Elite Flight Training Center programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (elite_id, 'Zero to Hero Package', 'Complete training from beginner to CFI', '12-18 months', '$65,000'),
    (elite_id, 'Private Pilot License', 'Start your flying journey', '3-5 months', '$9,200');

  -- Horizon Professional Flight School programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (horizon_id, 'Private Pilot License', 'Affordable path to your license', '3-6 months', '$7,800'),
    (horizon_id, 'Instrument Rating', 'Advanced flying skills', '2-4 months', '$6,500');

  -- Premier Aviation Institute programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (premier_id, 'Professional Pilot Program', 'Complete career training', '12-18 months', '$75,000'),
    (premier_id, 'Private Pilot License', 'Begin your journey', '3-6 months', '$10,500'),
    (premier_id, 'Instructor Ratings', 'Become a CFI', '2-3 months', '$8,000');

  -- Coastal Flight Academy programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (coastal_id, 'Private Pilot License', 'Learn to fly by the coast', '3-6 months', '$8,900'),
    (coastal_id, 'Commercial Pilot License', 'Turn pro in paradise', '6-10 months', '$18,500');

  -- Rotorcraft Training Solutions programs
  INSERT INTO training_programs (school_id, name, description, duration, price) VALUES
    (rotorcraft_id, 'Private Helicopter License', 'Learn rotorcraft basics', '3-6 months', '$12,000'),
    (rotorcraft_id, 'Commercial Helicopter License', 'Professional helicopter pilot', '6-12 months', '$25,000');
END $$;

-- Create a default admin user (update with your actual email after first Google sign-in)
-- You'll need to sign in first, then run this to make yourself admin:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com';
