-- AeroGuide Database Schema for Supabase
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE inquiry_type AS ENUM ('general', 'discovery_flight', 'enrollment', 'brochure');
CREATE TYPE inquiry_status AS ENUM ('pending', 'contacted', 'closed');
CREATE TYPE message_status AS ENUM ('new', 'read', 'replied');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture TEXT,
    google_id VARCHAR(255) UNIQUE,
    role user_role DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    full_address TEXT,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    reviews_count INTEGER DEFAULT 0,
    image_url TEXT NOT NULL,
    pricing VARCHAR(100) NOT NULL,
    students INTEGER DEFAULT 0,
    duration VARCHAR(100) NOT NULL,
    certifications TEXT[] DEFAULT '{}',
    phone VARCHAR(50),
    email VARCHAR(255),
    website TEXT,
    established INTEGER,
    fleet_size INTEGER,
    instructors INTEGER,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training programs table
CREATE TABLE training_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    course VARCHAR(255) NOT NULL,
    status review_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    inquiry_type inquiry_type DEFAULT 'general',
    status inquiry_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status message_status DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_schools_location ON schools(location);
CREATE INDEX idx_schools_rating ON schools(rating DESC);
CREATE INDEX idx_schools_is_active ON schools(is_active);
CREATE INDEX idx_reviews_school_id ON reviews(school_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_training_programs_school_id ON training_programs(school_id);
CREATE INDEX idx_inquiries_school_id ON inquiries(school_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update school rating when reviews change
CREATE OR REPLACE FUNCTION update_school_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE schools SET
            rating = COALESCE((
                SELECT AVG(rating)::DECIMAL(2,1)
                FROM reviews
                WHERE school_id = OLD.school_id AND status = 'approved'
            ), 0),
            reviews_count = (
                SELECT COUNT(*)
                FROM reviews
                WHERE school_id = OLD.school_id AND status = 'approved'
            )
        WHERE id = OLD.school_id;
        RETURN OLD;
    ELSE
        UPDATE schools SET
            rating = COALESCE((
                SELECT AVG(rating)::DECIMAL(2,1)
                FROM reviews
                WHERE school_id = NEW.school_id AND status = 'approved'
            ), 0),
            reviews_count = (
                SELECT COUNT(*)
                FROM reviews
                WHERE school_id = NEW.school_id AND status = 'approved'
            )
        WHERE id = NEW.school_id;
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Trigger to update school rating
CREATE TRIGGER update_school_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_school_rating();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Schools: Anyone can read active schools, admins can do everything
CREATE POLICY "Schools are viewable by everyone" ON schools
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage schools" ON schools
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Training programs: Anyone can read, admins can manage
CREATE POLICY "Training programs are viewable by everyone" ON training_programs
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage training programs" ON training_programs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Reviews: Anyone can read approved, users can create, admins can manage
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage reviews" ON reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Inquiries: Users can create and view own, admins can view all
CREATE POLICY "Users can create inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own inquiries" ON inquiries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage inquiries" ON inquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Contact messages: Anyone can create, admins can view
CREATE POLICY "Anyone can create contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage contact messages" ON contact_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Users: Users can view own profile, admins can view all
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can manage users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Create a default admin user (change email and credentials as needed)
-- Note: You'll need to create this user through the auth flow first, then update role
-- INSERT INTO users (email, name, role) VALUES ('admin@aeroguide.com', 'Admin', 'admin');
