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
- `GET /api/products` - Get all products
- `GET /api/products/{slug}` - Get product by slug
- `GET /api/products/category/{slug}` - Get products by category

### Leads
- `POST /api/leads` - Create lead
- `GET /api/leads` - Get all leads
- `GET /api/leads/{id}` - Get lead by ID

### Authentication
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
    "price_3month": 32400
  }'
```

## Database

### View Database

```bash
sqlite3 backend/carespace.db
.tables                    # List tables
SELECT * FROM categories;  # Query data
.quit                      # Exit
```

### Reset Database

```bash
# Delete database file (all data lost)
rm backend/carespace.db

# Restart server to recreate
```

## Environment Variables

Create `backend/.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Scripts

- `seed_data.py` - Populate database with 10 categories and 41 products (run once after setup)

### Run Setup Script

```bash
python seed_data.py
```

## Testing

Use Swagger UI at `http://127.0.0.1:8000/docs` to test all endpoints interactively.

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
