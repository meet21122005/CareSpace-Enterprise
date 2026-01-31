# CareSpace Enterprise - Medical Equipment Rental Platform

Modern medical equipment rental management system built with FastAPI, SQLAlchemy, and SQLite.

## Features

- 🏥 **Equipment Management** - Manage medical equipment inventory (hospital beds, oxygen concentrators, ventilators, etc.)
- 📦 **Categories** - Organize equipment by categories
- 💰 **Dynamic Pricing** - Support for 1-month, 2-month, and 3-month rental periods
- 👥 **User Management** - Google OAuth login with session-based authentication
- 📞 **Lead Capture** - Track customer inquiries from multiple sources (WhatsApp, calls, forms)
- 📱 **REST API** - Clean API endpoints with Swagger documentation

## Tech Stack

- **Backend**: FastAPI 0.104.1
- **Database**: SQLite with SQLAlchemy ORM
- **Auth**: Google OAuth with session cookies
- **Server**: Uvicorn
- **Python**: 3.9+

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
```

### 2. Run Server

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

Server runs at: `http://127.0.0.1:8000`

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

- `add_categories.py` - Add 10 medical equipment categories
- `add_all_products.py` - Add products with daily/weekly/monthly pricing
- `add_all_products_monthly.py` - Add products with 1/2/3 month pricing
- `test_pricing.py` - Test pricing by duration
- `find_duplicates.py` - Find duplicate products

### Run Scripts

```bash
python add_categories.py
python add_all_products_monthly.py
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

### Port 8000 already in use
```bash
python -m uvicorn app.main:app --port 8001
```

### Module not found: app
```bash
cd backend
python -m uvicorn app.main:app --reload
```

### Database locked
Delete `carespace.db` and restart server (loses all data).

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
