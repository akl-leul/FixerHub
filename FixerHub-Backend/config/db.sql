CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TYPE user_role AS ENUM ('client', 'professional');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'failed');

CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_otp VARCHAR(6),
    location TEXT
);

CREATE TABLE ProfessionalDocuments (
    document_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    national_id_document_url VARCHAR(255),
    work_clearance_document_url VARCHAR(255),
    verification_status verification_status DEFAULT 'pending',
    verification_otp VARCHAR(6),
    verified_name VARCHAR(100)
);

CREATE TABLE Categories (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(50) NOT NULL,
	icon TEXT
);

CREATE TABLE SubCategories (
    sub_category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES Categories(category_id) ON DELETE CASCADE,
    sub_category_name VARCHAR(50) NOT NULL
);

CREATE TABLE ProfessionalJobs (
    job_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    category_id UUID REFERENCES Categories(category_id) ON DELETE CASCADE,
    category_price DECIMAL(10, 2) NOT NULL,
    location GEOMETRY(POINT)
);

CREATE TABLE JobSubCategoryPricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES ProfessionalJobs(job_id) ON DELETE CASCADE,
    sub_category_id UUID REFERENCES SubCategories(sub_category_id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    professional_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);