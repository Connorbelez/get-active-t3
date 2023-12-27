CREATE TABLE events (
  id VARCHAR(36) PRIMARY KEY, -- Adjust the VARCHAR size according to your requirements
  event_creator_id VARCHAR(36) REFERENCES users(id),
  event_creator VARCHAR(255) NOT NULL,
  is_18_plus BOOLEAN,
  is_public BOOLEAN,
  min_age INTEGER,
  event_title VARCHAR(255) NOT NULL,
  event_headline VARCHAR(255) NOT NULL,
  event_content_short TEXT,
  event_content JSON, -- Use JSON data type directly without "|" (pipe)
  event_date DATE NOT NULL,
  event_start_time TIMESTAMP,
  event_end_time TIMESTAMP,
  max_tickets INTEGER,
  drinks_included BOOLEAN,
  event_location VARCHAR(255) NOT NULL,
  ticket_price NUMERIC(10, 2) NOT NULL,
  hero_image VARCHAR(255) NOT NULL,
  ticket_image VARCHAR(255),
  ticket_logo VARCHAR(255),
  
  cash_payment_enabled BOOLEAN NOT NULL,
  credit_payment_enabled BOOLEAN NOT NULL,
  etransfer_payment_enabled BOOLEAN NOT NULL,
  free_payment_enabled BOOLEAN NOT NULL,


  event_complete BOOLEAN NOT NULL,
  event_cancelled BOOLEAN NOT NULL,
  event_cancelled_reason VARCHAR(255),
  event_cancelled_by VARCHAR(255),
  event_cancelled_by_id INTEGER,
  event_cancelled_at TIMESTAMP,
  
  allow_reviews BOOLEAN,
  allow_comments BOOLEAN,
  
  -- Adding Indexes using the KEY keyword
  KEY idx_event_creator_id (event_creator_id),
  KEY idx_event_location (event_location)
);


CREATE TABLE reviews (
  id VARCHAR PRIMARY KEY,
  event_id VARCHAR REFERENCES events(id),
  review_author_id INTEGER REFERENCES users(id),
  review_title VARCHAR(255) NOT NULL,
  review_content TEXT,
  review_rating INTEGER,
  review_author VARCHAR(255) NOT NULL,
  review_date DATE NOT NULL,
  
  -- Adding Indexes using the KEY keyword
  KEY idx_event_id (event_id),
  KEY idx_review_author_id (review_author_id),
);


CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  admin BOOLEAN NOT NULL,
  referral_code VARCHAR(10) NOT NULL UNIQUE,
  event_creator BOOLEAN NOT NULL,
  password VARCHAR(255),
  gender ENUM('male', 'female', 'other'),
  image VARCHAR(255),
  events_created INTEGER,
  events_attended INTEGER,
  events_reviewed INTEGER,
  events_cancelled INTEGER,
  
  -- Adding Indexes using the KEY keyword
  KEY idx_referral_code (referral_code),
  KEY idx_username (username),
  KEY idx_email (email)
);


CREATE TABLE tickets (
  id VARCHAR PRIMARY KEY,
  event_id VARCHAR REFERENCES events(id),
  ticket_holder_id VARCHAR REFERENCES users(id),
  ticket_holder_name VARCHAR(255),
  ticket_type VARCHAR(100),
  ticket_price NUMERIC(10, 2) NOT NULL,
  ticket_logo VARCHAR(255),
  drinks_included BOOLEAN,
  payment_method ENUM('cash', 'credit', 'etransfer', 'free'),
  payment_complete BOOLEAN,
  payment_required BOOLEAN,
  ticket_cancelled BOOLEAN,
  ticket_cancelled_reason VARCHAR(255)
  
  -- Adding Indexes using the KEY keyword
  KEY idx_event_id (event_id),
  KEY idx_ticket_holder_id (ticket_holder_id),
);
