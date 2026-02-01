# CareSpace Enterprise - Medical Equipment Rental Platform

Modern medical equipment rental management system built with FastAPI, SQLAlchemy, and SQLite.

## Features

- 🏥 **Equipment Management** - Manage medical equipment inventory (hospital beds, oxygen concentrators, ventilators, etc.)
- 📦 **Categories** - Organize equipment by categories
- 💰 **Dynamic Pricing** - Support for 1-month, 2-month, and 3-month rental periods
- 👥 **User Management** - Google OAuth login with session-based authentication
- 📞 **Lead Capture** - Track customer inquiries from multiple sources (WhatsApp, calls, forms)
- 📱 **REST API** - Clean API endpoints with Swagger documentation

## Recent Updates (Feb 2026)

### ✅ Fixed Issues
- **Server Crashes**: Resolved critical import conflict causing automatic shutdowns
- **Validation Errors**: Fixed Pydantic schema validation with proper Create/Out separation
- **Missing Fields**: Added `youtube_url` field to Product model and all schemas
- **Error Handling**: Comprehensive try/except blocks in all routes with proper HTTP status codes
- **Database Stability**: Configured SQLite with WAL mode for concurrent access

### 🔧 Backend Fixes Applied
1. Product model: Added `youtube_url: Column(String, nullable=True)`
2. Schemas: Separated `ProductCreate` (validation) from `ProductOut` (response)
3. Routes: Added try/except error handling to all endpoints (categories, products, leads)
4. Database: Enabled SQLite WAL mode, foreign key constraints, pragmas for stability
5. Removed conflicting `fastapi/types.py` file that was shadowing stdlib `types` module

### 📊 Data
- **Categories**: 10 (Air Mattress, CPAP, BiPAP, DVT, Feeding, Hospital Bed, Oxygen, Monitor, Suction, Ventilator)
- **Products**: 41 medical equipment items with 3-tier pricing (1/2/3 month rentals)
- **Pricing**: ₹3,000 - ₹81,000 depending on equipment and rental duration

## Database

The system includes **41 pre-loaded medical equipment products** across **10 categories**:
- Air Mattress (3)
- Auto CPAP (3)
- BiPAP (8)
- DVT / Lymph Pump (4)
- Feeding Infusion Syringe (1)
- Hospital Bed (6)
- Oxygen Concentrator (5)
- Patient Monitor (2)
- Suction Machine (4)
- Ventilator (5)

## Quick Start

### 1. Setup

```bash
# Clone repository
git clone https://github.com/meet21122005/CareSpace-Enterprise.git
cd CareSpace-Enterprise

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r backend/requirements.txt

# Seed database with products (one-time)
python seed_data.py
```

### 2. Run Server

```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Server runs at: `http://127.0.0.1:8000`

✅ **Status**: Server is stable with automatic error handling and validation

### 3. API Documentation

- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

## Project Structure

```
CareSpace-Enterprise/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── database.py       # SQLAlchemy setup
│   │   │   └── deps.py           # Dependencies
│   │   ├── models/               # Database models
│   │   │   ├── category.py
│   │   │   ├── product.py
│   │   │   ├── lead.py
│   │   │   └── user.py
│   │   ├── schemas/              # Pydantic schemas
│   │   │   ├── category.py
│   │   │   ├── product.py
│   │   │   ├── lead.py
│   │   │   └── user.py
│   │   ├── routes/               # API endpoints
│   │   │   ├── categories.py
│   │   │   ├── products.py
│   │   │   ├── leads.py
│   │   │   └── auth.py
│   │   └── main.py               # FastAPI app
│   ├── requirements.txt
│   └── .env                      # Environment variables
├── API_EXAMPLES.md               # API request examples
├── QUICK_START.md                # Setup guide
└── README.md                     # This file
```

## API Endpoints

### Categories
- `POST /api/categories` - Create category
- `GET /api/categories` - Get all categories
- `GET /api/categories/{slug}` - Get category by slug

### Products
- `POST /api/products` - Create product
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{slug}` - Get product by slug with full details
- `GET /api/products/category/{slug}` - Get products by category slug
- `GET /api/products/{slug}/related` - Get related products from same category
- `GET /api/products/search?q=query` - Search products by name

### Leads
- `POST /api/leads` - Create lead (customer inquiry)
- `GET /api/leads` - Get all leads
- `GET /api/leads/{id}` - Get lead by ID

### Health & Info
- `GET /` - API info and endpoint documentation
- `GET /health` - Health check endpoint

### Authentication (Planned)
- `POST /auth/google-login` - Login with Google
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

## Example: Create Product

```bash
curl -X POST http://127.0.0.1:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ICU Hospital Bed",
    "slug": "icu-bed",
    "category_id": "cat-123",
    "price_1month": 12000,
    "price_2month": 22800,
    "price_3month": 32400,
    "description": "5-function automatic ICU bed",
    "image_url": "https://example.com/bed.jpg",
    "youtube_url": "https://youtube.com/watch?v=..."
  }'
```

**Product Fields:**
- `name` (required): Equipment name
- `slug` (required): URL-friendly identifier (lowercase, hyphens only)
- `category_id` (required): Category UUID
- `price_1month`, `price_2month`, `price_3month`: Monthly rental prices (₹)
- `description`: Equipment description
- `image_url`: Product image URL
- `specifications`: Technical specs
- `youtube_url`: Demo/tutorial video URL (optional)

## Backend File Explanations

### Core Files (`backend/app/core/`)

**database.py**
- SQLAlchemy engine and session configuration
- SQLite database setup with WAL mode for concurrent access
- PRAGMA configurations for stability:
  - `journal_mode=WAL`: Write-Ahead Logging for better concurrency
  - `synchronous=NORMAL`: Balance between safety and performance
  - `foreign_keys=ON`: Enable foreign key constraints
- Connection pooling with `pool_pre_ping=True` for reliability

**deps.py**
- Dependency injection functions for routes
- Database session provider for endpoints

### Models (`backend/app/models/`)

**product.py** - Medical Equipment
- UUID primary key
- Fields: name, slug, category_id, prices (1/2/3 month), image_url, description, specifications, youtube_url
- Relationship to Category (many-to-one)

**category.py** - Equipment Categories
- UUID primary key
- Fields: name, slug, description
- Relationship to Products (one-to-many with cascade delete)
- Property `product_count`: Returns number of products in category

**lead.py** - Customer Inquiries
- UUID primary key
- Fields: name, email, phone, message, source (WhatsApp/call/form)
- Timestamps: created_at, updated_at

**user.py** - User Accounts (for future OAuth)
- UUID primary key
- Fields: email, google_id, name, avatar

### Schemas (`backend/app/schemas/`)

**product.py** - Validation & Response Models
- `ProductCreate`: Strict validation for POST requests
  - Slug pattern: `^[a-z0-9\-]+$` (lowercase, hyphens, numbers only)
  - Min/max string lengths validated
  - Prices validated as non-negative integers
- `ProductOut`: Response model for GET requests
- `ProductDetail`: Extended product view
- `ProductSearchResult`: Search-specific response with category info

**category.py**, **lead.py**, **user.py**: Similar Create/Out schema separation

### Routes (`backend/app/routes/`)

**products.py** - Product Endpoints
- POST /api/products: Create with try/except IntegrityError handling
- GET /api/products: List all products
- GET /api/products/search?q=: Search by name/description
- GET /api/products/{slug}: Single product detail
- GET /api/products/category/{slug}: Products by category
- GET /api/products/{slug}/related: Related products from same category
- All endpoints wrapped in error handling with proper HTTP status codes

**categories.py** - Category Endpoints
- POST /api/categories: Create category with duplicate checking
- GET /api/categories: List all categories
- GET /api/categories/{slug}: Single category with product count
- Error handling for IntegrityError on duplicate slugs

**leads.py** - Lead Endpoints
- POST /api/leads: Create customer inquiry (201 Created)
- GET /api/leads: List all leads
- GET /api/leads/{id}: Single lead detail
- Comprehensive error handling and validation

**auth.py** - Authentication (Placeholder)
- To be implemented with Google OAuth

### Main Application

**main.py**
- FastAPI app initialization
- CORS middleware configuration (allows all origins)
- Router registration (categories, products, leads)
- Health check endpoint (`/health`)
- Root endpoint with API info

## Error Handling

All endpoints include comprehensive error handling:

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success (GET, POST complete) | Returns data |
| 201 | Created (POST successful) | New resource created |
| 400 | Bad Request | Missing required field, invalid format |
| 404 | Not Found | Product/category doesn't exist |
| 422 | Validation Error | Invalid data type or constraint violated |
| 500 | Server Error | Database connection issue (rare with WAL mode) |

### Try/Except Blocks in All Routes
- Database IntegrityError handling (duplicate entries)
- SQLAlchemy session flush/commit error catching
- Proper HTTPException raising with status codes
- All errors logged and returned as JSON

## Database Management

### View Database

```bash
sqlite3 backend/carespace.db
.tables                    # List tables
SELECT * FROM products;    # View products
SELECT * FROM categories;  # View categories
.quit                      # Exit
```

### Reset Database

```bash
# Delete database file (all data lost)
rm backend/carespace.db

# Restart server to recreate empty tables
# Then run: python seed_data.py
```

### Backup Database

```bash
# Copy database file
cp backend/carespace.db backend/carespace.db.backup
```

## Scripts

- `seed_data.py` - Populate database with 10 categories and 41 products (run once after setup)

### Run Setup Script

```bash
python seed_data.py
```

## Testing

### 1. Interactive Testing (Recommended)
Use Swagger UI at `http://127.0.0.1:8000/docs`:
- Try all endpoints interactively
- See request/response schemas
- Test with real data
- View error responses

### 2. cURL Examples

**Get all products:**
```bash
curl http://127.0.0.1:8000/api/products
```

**Search products:**
```bash
curl "http://127.0.0.1:8000/api/products/search?q=hospital"
```

**Create a lead:**
```bash
curl -X POST http://127.0.0.1:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "message": "Need oxygen concentrator",
    "source": "WhatsApp"
  }'
```

### 3. Health Check
```bash
curl http://127.0.0.1:8000/health
# Returns: {"status": "ok"}
```

### 4. Environment Variables

Create `backend/.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Production Deployment

Before deploying:

- [ ] Set environment variables
- [ ] Use HTTPS only
- [ ] Enable authentication
- [ ] Set up logging
- [ ] Configure database backup
- [ ] Use production database (PostgreSQL recommended)
- [ ] Set up monitoring/alerts
- [ ] Implement rate limiting

## Troubleshooting

### Server won't start
- Make sure you're in the `backend` directory
- Activate virtual environment: `venv\Scripts\activate`
- Verify port 8000 is free or use `--port 8001`

### Port 8000 already in use
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

### Module not found: app
```bash
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Validation errors on requests
- Ensure request data matches schema (use Swagger UI `/docs` to test)
- Check required fields: `name`, `slug`, `category_id` for products
- Prices should be integers (no decimals)

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m "Add feature"`
3. Push: `git push origin feature/name`
4. Create Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, create an issue on GitHub or contact the team.

---

**Built with ❤️ for CareSpace Enterprise**
