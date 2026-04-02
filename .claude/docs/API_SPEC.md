# TASA Website - API Specification

## Base URL
```
Development: http://localhost:3000/api
Production: https://mytasa.org/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header.

```
Authorization: Bearer {token}
```

---

## Endpoints (Planned)

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123",
  "branch": "Johannesburg",
  "institution": "University Name"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbG..."
  }
}

Error (400):
{
  "success": false,
  "error": "EMAIL_ALREADY_EXISTS",
  "message": "User with this email already registered"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "token": "eyJhbG...",
    "expiresIn": 3600
  }
}

Error (401):
{
  "success": false,
  "error": "INVALID_CREDENTIALS",
  "message": "Email or password is incorrect"
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Successfully logged out"
}
```

#### Refresh Token
```
POST /api/auth/refresh
Content-Type: application/json

Request:
{
  "refreshToken": "refresh_token_here"
}

Response (200):
{
  "success": true,
  "data": {
    "token": "new_token",
    "expiresIn": 3600
  }
}
```

---

### Events Endpoints

#### List Events
```
GET /api/events?page=1&limit=10&branch=&month=
Authorization: Bearer {token}

Query Parameters:
- page: integer (default: 1)
- limit: integer (default: 10)
- branch: string (filter by branch)
- month: string (YYYY-MM format)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "event_123",
      "title": "National Conference 2026",
      "description": "Annual gathering...",
      "startDate": "2026-06-15T09:00:00Z",
      "endDate": "2026-06-17T17:00:00Z",
      "location": "Johannesburg",
      "branch": "National",
      "category": "conference",
      "capacity": 500,
      "registered": 342,
      "image": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

#### Get Event Detail
```
GET /api/events/{eventId}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": "event_123",
    "title": "National Conference 2026",
    "description": "Multi-line description...",
    "startDate": "2026-06-15T09:00:00Z",
    "endDate": "2026-06-17T17:00:00Z",
    "location": "Johannesburg",
    "venue": "Venue Name",
    "branch": "National",
    "category": "conference",
    "capacity": 500,
    "registered": 342,
    "userRsvp": "CONFIRMED",
    "image": "https://...",
    "schedule": [
      {
        "day": "Day 1",
        "events": [
          {
            "time": "09:00",
            "title": "Opening Ceremony",
            "speaker": "Name"
          }
        ]
      }
    ],
    "createdBy": {
      "id": "admin_456",
      "name": "Event Organizer"
    }
  }
}
```

#### Create Event (Admin)
```
POST /api/events
Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "title": "Event Title",
  "description": "Full description",
  "startDate": "2026-07-01T09:00:00Z",
  "endDate": "2026-07-02T17:00:00Z",
  "location": "City Name",
  "venue": "Venue Details",
  "branch": "National",
  "category": "workshop",
  "capacity": 100,
  "image": "base64_image_or_url"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "event_124",
    "title": "Event Title",
    "...": "..."
  }
}
```

#### RSVP to Event
```
POST /api/events/{eventId}/rsvp
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "rsvpStatus": "CONFIRMED"  // OPTIONS: CONFIRMED, DECLINED, MAYBE
}

Response (200):
{
  "success": true,
  "data": {
    "eventId": "event_123",
    "userId": "user_123",
    "status": "CONFIRMED",
    "registeredAt": "2026-04-02T10:30:00Z"
  }
}
```

---

### Branches Endpoints

#### List Branches
```
GET /api/branches?level=all
Authorization: Bearer {token}

Query Parameters:
- level: "national", "provincial", "branch", "all" (default: all)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "branch_001",
      "name": "National Office",
      "level": "national",
      "country": "South Africa",
      "contact": {
        "email": "national@tasa.org",
        "phone": "+27 1 234 5678"
      },
      "leadership": [
        {
          "name": "John Doe",
          "position": "National President",
          "email": "john@tasa.org",
          "phone": "+27 1 234 5678"
        }
      ],
      "memberCount": 500,
      "meetingDay": "Wednesday",
      "meetingTime": "19:00"
    },
    {
      "id": "branch_002",
      "name": "Gauteng Province",
      "level": "provincial",
      "parent": "branch_001",
      "province": "Gauteng",
      "...": "..."
    }
  ]
}
```

#### Get Branch Detail
```
GET /api/branches/{branchId}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": "branch_002",
    "name": "Gauteng Province",
    "level": "provincial",
    "province": "Gauteng",
    "memberCount": 250,
    "email": "gauteng@tasa.org",
    "phone": "+27 11 987 6543",
    "address": "Full address",
    "mapCoordinates": {
      "latitude": -25.7461,
      "longitude": 28.2311
    },
    "leadership": [
      {
        "name": "Jane Smith",
        "position": "Provincial President",
        "email": "jane@tasa.org"
      }
    ],
    "institutions": [
      {
        "name": "University A",
        "city": "Johannesburg",
        "contactPerson": "Person Name"
      }
    ],
    "events": [
      {
        "id": "event_123",
        "title": "Provincial Conference",
        "date": "2026-05-10"
      }
    ]
  }
}
```

---

### Gallery Endpoints

#### List Photos/Videos
```
GET /api/gallery?category=&page=1
Authorization: Bearer {token}

Query Parameters:
- category: "services", "conferences", "outreach", "sports", "social" (or all)
- page: integer (default: 1)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "media_123",
      "title": "Conference 2025",
      "description": "Photos from...",
      "type": "image",
      "category": "conferences",
      "url": "https://...",
      "thumbnail": "https://...",
      "uploadedAt": "2026-03-15T10:00:00Z",
      "uploadedBy": "admin"
    }
  ]
}
```

---

### Resources Endpoints

#### List Resources
```
GET /api/resources?type=&search=
Authorization: Bearer {token}

Query Parameters:
- type: "devotional", "bible-study", "academic", "health", "financial"
- search: string

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "resource_123",
      "title": "Daily Devotional - April 2",
      "description": "Short description...",
      "type": "devotional",
      "content": "HTML content...",
      "author": "Author Name",
      "createdAt": "2026-04-02T00:00:00Z",
      "downloads": 145
    }
  ]
}
```

---

### Blog Endpoints

#### List Articles
```
GET /api/blog?category=&search=&limit=10
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "article_123",
      "title": "Leadership in Student Ministry",
      "slug": "leadership-in-student-ministry",
      "excerpt": "Short excerpt...",
      "category": "leadership",
      "author": {
        "id": "user_456",
        "name": "Jane Doe"
      },
      "publishedAt": "2026-04-01T10:00:00Z",
      "views": 234,
      "readTime": 8
    }
  ]
}
```

#### Get Article Detail
```
GET /api/blog/{slug}
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": "article_123",
    "title": "Leadership in Student Ministry",
    "slug": "leadership-in-student-ministry",
    "content": "Full HTML content...",
    "category": "leadership",
    "author": {
      "id": "user_456",
      "name": "Jane Doe",
      "bio": "Author bio...",
      "image": "https://..."
    },
    "publishedAt": "2026-04-01T10:00:00Z",
    "views": 234,
    "comments": [],
    "relatedArticles": [...]
  }
}
```

---

### Contact Endpoint

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+27 1 234 5678",
  "subject": "General Inquiry",
  "message": "Message content...",
  "department": "general"
}

Response (200):
{
  "success": true,
  "message": "Your message has been received. We'll respond shortly.",
  "ticketNo": "TICKET_12345"
}

Error (400):
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Please fill all required fields"
}
```

---

### Donation Endpoints

#### Create Donation
```
POST /api/donations
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "amount": 100.00,
  "currency": "ZAR",
  "purpose": "General Fund",
  "anonymous": false,
  "paymentMethod": "card"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "donation_123",
    "amount": 100.00,
    "status": "pending",
    "paymentIntentId": "pi_...",
    "clientSecret": "pi_secret"
  }
}
```

#### Payment Webhook
```
POST /api/webhooks/payment
Content-Type: application/json

Request:
{
  "type": "payment.completed",
  "data": {
    "paymentId": "pi_123",
    "donationId": "donation_123",
    "status": "succeeded"
  }
}

Response (200):
{
  "success": true,
  "message": "Webhook processed"
}
```

---

## Error Codes

```
200 - OK
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
500 - Internal Server Error
```

## Rate Limiting
- 1000 requests per hour per IP
- 100 requests per hour per authenticated user (write operations)

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable message",
  "details": {}
}
```

---

**Last Updated**: April 2, 2026  
**Status**: Planned / In Development  
**Version**: 1.0.0
