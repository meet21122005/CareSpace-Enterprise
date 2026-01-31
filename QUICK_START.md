# CareSpace Backend - Quick Start Guide

## Prerequisites
- Python 3.9+
- pip or conda

## Installation

### 1. Navigate to backend directory
```bash
cd d:\meet\CareSpace-Enterprise\backend
```

### 2. Create virtual environment (optional but recommended)
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or on Mac/Linux:
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

If `requirements.txt` is empty, install manually:
```bash
pip install fastapi uvicorn sqlalchemy pydantic python-dotenv
pip freeze > requirements.txt
```

## Running the Server

### Development Mode (with auto-reload)
```bash
cd d:\meet\CareSpace-Enterprise\backend
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Output should show:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Production Mode
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once server is running:

### Swagger UI (Interactive Docs)
Open: `http://127.0.0.1:8000/docs`

### ReDoc (Alternative Docs)
Open: `http://127.0.0.1:8000/redoc`

## Testing Endpoints

### Option 1: Using Swagger UI (Recommended)
1. Open `http://127.0.0.1:8000/docs`
2. Click any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

### Option 2: Using Python Test Script
```bash
cd d:\meet\CareSpace-Enterprise
python test_api.py
```

### Option 3: Using cURL

**Create a Category:**
```bash
curl -X POST http://127.0.0.1:8000/api/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Hospital Beds\", \"slug\": \"hospital-beds\", \"description\": \"Professional beds\"}"
```

**Get All Categories:**
```bash
curl http://127.0.0.1:8000/api/categories
```

**Get Category by Slug:**
```bash
curl http://127.0.0.1:8000/api/categories/hospital-beds
```

**Create a Product:**
```bash
curl -X POST http://127.0.0.1:8000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"ICU Bed\", \"slug\": \"icu-bed\", \"daily_price\": 500}"
```

**Get All Products:**
```bash
curl http://127.0.0.1:8000/api/products
```

**Get Products by Category:**
```bash
curl http://127.0.0.1:8000/api/products/category/hospital-beds
```

**Get Product by Slug:**
```bash
curl http://127.0.0.1:8000/api/products/icu-bed
```

**Create a Lead:**
```bash
curl -X POST http://127.0.0.1:8000/api/leads \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"John Doe\", \"phone\": \"+919876543210\", \"source\": \"whatsapp\"}"
```

### Option 4: Using Postman
1. Import these collections or create manually
2. Base URL: `http://127.0.0.1:8000`
3. Create requests for each endpoint

## Database

### View SQLite Database
```bash
cd d:\meet\CareSpace-Enterprise\backend
sqlite3 carespace.db

# In SQLite CLI:
.tables                 # List all tables
.schema categories      # View table structure
SELECT * FROM categories;  # Query data
.quit               # Exit
```

### Reset Database
```bash
# Delete the database file (all data will be lost)
rm carespace.db  # On Windows: del carespace.db

# Restart server to recreate empty database
```

## Directory Structure
```
CareSpace-Enterprise/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app & routes
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── database.py         # SQLAlchemy setup
│   │   │   └── deps.py             # Dependency injection
│   │   ├── models/                 # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── category.py
│   │   │   ├── product.py
│   │   │   └── lead.py
│   │   ├── schemas/                # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── category.py
│   │   │   ├── product.py
│   │   │   └── lead.py
│   │   └── routes/                 # API endpoints
│   │       ├── __init__.py
│   │       ├── categories.py
│   │       ├── products.py
│   │       └── leads.py
│   ├── requirements.txt             # Python dependencies
│   └── carespace.db                 # SQLite database (auto-created)
├── test_api.py                      # API test script
├── FIXES_SUMMARY.md                 # What was fixed
└── BEST_PRACTICES.md                # Production guidelines
```

## Troubleshooting

### ❌ "Module not found: app"
```bash
# Make sure you're in the right directory
cd d:\meet\CareSpace-Enterprise\backend
python -m uvicorn app.main:app --reload
```

### ❌ "Port 8000 already in use"
```bash
# Use a different port
python -m uvicorn app.main:app --port 8001 --reload
```

### ❌ "Database locked"
```bash
# Close other connections and try again
# Or delete carespace.db and restart (loses all data)
```

### ❌ "ValidationError" in response
Check your JSON payload:
- All required fields present
- Correct data types (strings vs numbers)
- Valid slug format (lowercase, hyphens only)

### ❌ "Foreign key constraint failed"
Make sure the `category_id` exists in the database:
```bash
# Get valid category IDs
curl http://127.0.0.1:8000/api/categories
```

## Next Steps

1. **Test all endpoints** using Swagger at `/docs`
2. **Create sample data** for development
3. **Review FIXES_SUMMARY.md** for what was fixed
4. **Review BEST_PRACTICES.md** for production setup
5. **Build your frontend** to connect with these APIs

## Environment Variables (Optional)

Create `.env` file in backend directory:
```env
DATABASE_URL=sqlite:///./carespace.db
API_TITLE=CareSpace Enterprise API
DEBUG=True
```

## Performance Tips

- Use pagination for large datasets
- Add indexes to frequently queried fields (already done)
- Cache API responses on frontend
- Use database connection pooling for production

## Security Checklist

Before going to production:
- [ ] Set `DEBUG=False`
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS
- [ ] Add authentication/authorization
- [ ] Validate all inputs
- [ ] Add rate limiting
- [ ] Set up proper logging
- [ ] Use strong database passwords

## Getting Help

- **FastAPI**: https://fastapi.tiangolo.com/
- **SQLAlchemy**: https://docs.sqlalchemy.org/
- **Pydantic**: https://docs.pydantic.dev/
- **Python**: https://www.python.org/doc/

---

**All systems go!** Your CareSpace backend is ready to serve. 🚀
