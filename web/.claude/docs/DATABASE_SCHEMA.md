# TASA Website - Database Schema

## Database Technology
- **Primary**: PostgreSQL (recommended)
- **Alternative**: MongoDB
- **ORM**: Prisma or TypeORM

## Entity Relationship Diagram

```
User
├── has many Posts (Blog articles)
├── has many Comments
├── has many Events (RSVPs)
├── has many Donations
└── belongs to Branch

Branch
├── has many Users (members)
├── has many Events
├── has many SubBranches (child branches)
├── belongs to ParentBranch (for Provincial/Individual)
└── has many Leadership positions

Event
├── belongs to Branch (organizer)
├── has many EventRSVPs
├── has many EventSchedules
├── has many Gallery
└── belongs to EventCategory

Post (Blog)
├── belongs to User (author)
├── has many Comments
├── belongs to PostCategory
└── has many Gallery

Gallery
├── belongs to Event (nullable)
├── belongs to Post (nullable)
└── has many Comments

Donation
├── belongs to User (donor)
├── has one Payment
└── belongs to DonationPurpose

Payment
├── belongs to Donation
└── tracks PaymentHistory
```

---

## Tables

### users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL (hashed),
  phone VARCHAR(20),
  profileImage VARCHAR(500),
  bio TEXT,
  institution VARCHAR(200),
  branchId INT REFERENCES branches(id),
  role ENUM('member', 'admin', 'superadmin') DEFAULT 'member',
  emailVerified BOOLEAN DEFAULT FALSE,
  verificationToken VARCHAR(255),
  verificationTokenExpiry DATETIME,
  isActive BOOLEAN DEFAULT TRUE,
  lastLogin DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL (soft delete)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_branchId ON users(branchId);
```

### branches
```sql
CREATE TABLE branches (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  level ENUM('national', 'provincial', 'individual') NOT NULL,
  parentBranchId INT REFERENCES branches(id),
  country VARCHAR(100),
  province VARCHAR(100),
  city VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  memberCount INT DEFAULT 0,
  meetingDay VARCHAR(20),
  meetingTime VARCHAR(5),
  image VARCHAR(500),
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_branches_level ON branches(level);
CREATE INDEX idx_branches_parentBranchId ON branches(parentBranchId);
```

### branch_leadership
```sql
CREATE TABLE branch_leadership (
  id SERIAL PRIMARY KEY,
  branchId INT NOT NULL REFERENCES branches(id),
  userId INT NOT NULL REFERENCES users(id),
  position VARCHAR(100) NOT NULL,
  startDate DATE,
  endDate DATE NULL,
  isCurrent BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(branchId, userId, position)
);

CREATE INDEX idx_branch_leadership_branchId ON branch_leadership(branchId);
CREATE INDEX idx_branch_leadership_userId ON branch_leadership(userId);
```

### event_categories
```sql
CREATE TABLE event_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7)
);

INSERT INTO event_categories (name, slug) VALUES
('Conference', 'conference'),
('Workshop', 'workshop'),
('Service', 'service'),
('Outreach', 'outreach'),
('Social', 'social'),
('Training', 'training'),
('Retreat', 'retreat');
```

### events
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  location VARCHAR(255),
  venue VARCHAR(255),
  branchId INT NOT NULL REFERENCES branches(id),
  categoryId INT REFERENCES event_categories(id),
  capacity INT,
  image VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  createdById INT NOT NULL REFERENCES users(id),
  isPublished BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL
);

CREATE INDEX idx_events_branchId ON events(branchId);
CREATE INDEX idx_events_startDate ON events(startDate);
CREATE INDEX idx_events_categoryId ON events(categoryId);
```

### event_rsvps
```sql
CREATE TABLE event_rsvps (
  id SERIAL PRIMARY KEY,
  eventId INT NOT NULL REFERENCES events(id),
  userId INT NOT NULL REFERENCES users(id),
  status ENUM('confirmed', 'declined', 'maybe') DEFAULT 'confirmed',
  registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(eventId, userId)
);

CREATE INDEX idx_event_rsvps_eventId ON event_rsvps(eventId);
CREATE INDEX idx_event_rsvps_userId ON event_rsvps(userId);
```

### event_schedules
```sql
CREATE TABLE event_schedules (
  id SERIAL PRIMARY KEY,
  eventId INT NOT NULL REFERENCES events(id),
  dayNumber INT,
  dayTitle VARCHAR(50),
  startTime TIME,
  endTime TIME,
  activities JSON (array of {time, title, speaker}),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_schedules_eventId ON event_schedules(eventId);
```

### post_categories
```sql
CREATE TABLE post_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

INSERT INTO post_categories (name, slug) VALUES
('Faith', 'faith'),
('Leadership', 'leadership'),
('Academics', 'academics'),
('Identity', 'identity'),
('News', 'news'),
('Student Life', 'student-life');
```

### posts (Blog)
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  authorId INT NOT NULL REFERENCES users(id),
  categoryId INT REFERENCES post_categories(id),
  image VARCHAR(500),
  views INT DEFAULT 0,
  readTime INT, -- in minutes
  isPublished BOOLEAN DEFAULT FALSE,
  publishedAt DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_authorId ON posts(authorId);
CREATE INDEX idx_posts_categoryId ON posts(categoryId);
CREATE INDEX idx_posts_publishedAt ON posts(publishedAt);
```

### comments
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  postId INT REFERENCES posts(id),
  authorId INT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  isApproved BOOLEAN DEFAULT FALSE,
  parentCommentId INT REFERENCES comments(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP NULL
);

CREATE INDEX idx_comments_postId ON comments(postId);
CREATE INDEX idx_comments_authorId ON comments(authorId);
```

### gallery
```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  mediaType ENUM('image', 'video') NOT NULL,
  category ENUM('services', 'conferences', 'outreach', 'sports', 'social') NOT NULL,
  url VARCHAR(500) NOT NULL,
  thumbnail VARCHAR(500),
  eventId INT REFERENCES events(id),
  postId INT REFERENCES posts(id),
  uploadedById INT REFERENCES users(id),
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_eventId ON gallery(eventId);
CREATE INDEX idx_gallery_postId ON gallery(postId);
```

### resources
```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  type ENUM('devotional', 'bible-study', 'academic', 'health', 'financial') NOT NULL,
  content LONGTEXT,
  fileUrl VARCHAR(500),
  authorId INT REFERENCES users(id),
  downloads INT DEFAULT 0,
  isPublished BOOLEAN DEFAULT FALSE,
  publishedAt DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_slug ON resources(slug);
```

### donations
```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  userId INT REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ZAR',
  purpose VARCHAR(200),
  anonymous BOOLEAN DEFAULT FALSE,
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  paymentIntentId VARCHAR(255),
  receiptNumber VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_donations_userId ON donations(userId);
CREATE INDEX idx_donations_status ON donations(status);
```

### payments
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  donationId INT NOT NULL REFERENCES donations(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(3),
  provider VARCHAR(50),
  providerId VARCHAR(255),
  status ENUM('pending', 'succeeded', 'failed', 'refunded'),
  metadata JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_donationId ON payments(donationId);
```

### contact_submissions
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT,
  department VARCHAR(100),
  ticketNumber VARCHAR(20) UNIQUE,
  status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  respondedAt TIMESTAMP NULL
);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
```

### refresh_tokens
```sql
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users(id),
  token VARCHAR(500) UNIQUE NOT NULL,
  expiresAt DATETIME NOT NULL,
  revokedAt DATETIME NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_userId ON refresh_tokens(userId);
```

### audit_logs
```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES users(id),
  action VARCHAR(100),
  entityType VARCHAR(100),
  entityId INT,
  changes JSON,
  ipAddress VARCHAR(45),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_userId ON audit_logs(userId);
CREATE INDEX idx_audit_logs_createdAt ON audit_logs(createdAt);
```

---

## Indexes

Key indexes for performance:
```sql
-- User searches
CREATE INDEX idx_users_email_createdAt ON users(email, createdAt);

-- Event filtering
CREATE INDEX idx_events_startDate_categoryId ON events(startDate, categoryId);

-- Blog searches
CREATE INDEX idx_posts_slug_publishedAt ON posts(slug, publishedAt);

-- Gallery filtering
CREATE INDEX idx_gallery_category_createdAt ON gallery(category, createdAt);
```

---

## Database Performance Optimization

1. **Connection Pooling**: Min 5, Max 20 connections
2. **Query Timeouts**: 30 seconds default
3. **Batch Operations**: For bulk inserts
4. **Soft Deletes**: Maintained with `deletedAt` field
5. **Caching**: Use Redis for frequently accessed data

---

## Sample Data

Insert sample data for development:

```sql
-- Branches
INSERT INTO branches (uuid, name, level) VALUES
('national-001', 'National Office', 'national'),
('province-001', 'Gauteng', 'provincial'),
('branch-001', 'Johannesburg University', 'individual');

-- Users
INSERT INTO users (uuid, email, firstName, lastName, password, branchId)
VALUES
('user-001', 'admin@tasa.org', 'Admin', 'User', 'hashed_password', 1);

-- Event Categories (pre-filled)
-- See INSERT statements above
```

---

**Last Updated**: April 2, 2026  
**Status**: Planned / Design Phase  
**Revision**: 1.0
