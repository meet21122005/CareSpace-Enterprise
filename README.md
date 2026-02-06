# CareSpace Enterprise - Medical Equipment Rental Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/react-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)

Modern medical equipment rental management system built with FastAPI, SQLAlchemy, SQLite, React, and TypeScript.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🌐 Live URLs](#-live-urls)
- [✨ Features](#-features)
- [📊 Database Overview](#-database-overview)
- [🏗️ Project Architecture](#️-project-architecture)
- [📡 API Endpoints](#-api-endpoints)
- [🔧 Technical Stack](#-technical-stack)
- [🚀 Deployment](#-deployment)
- [🐛 Recent Fixes & Updates](#-recent-fixes--updates)
- [📝 API Usage Examples](#-api-usage-examples)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

## 🚀 Quick Start

### Prerequisites
- **Python 3.9+** with pip
- **Node.js 18+** with npm
- **Git** for cloning

### One-Click Setup (Windows)
```bash
# Clone and setup everything automatically
git clone https://github.com/yourusername/CareSpace-Enterprise.git
cd CareSpace-Enterprise

# Run the all-in-one setup script
run_all.bat
```

### Manual Setup

#### Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Seed database (one-time setup)
cd ..
python seed_data.py
```

#### Frontend Setup
```bash
# Navigate to frontend
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Start Both Servers
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

## 🌐 Live URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000
- **API Docs**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

## ✨ Features

### 🏥 Core Functionality
- **Equipment Management** - Complete inventory of medical equipment
- **Dynamic Pricing** - 1-month, 2-month, and 3-month rental tiers
- **Category Organization** - 10 equipment categories
- **Search & Filter** - Advanced product search functionality
- **Lead Capture** - Customer inquiry management system

### 🎨 Frontend Features
- **Responsive Design** - Mobile-first approach with tablet/desktop optimization
- **Modern UI** - Glassmorphism effects with Tailwind CSS
- **Interactive Search** - Real-time search with dropdown results
- **Smooth Animations** - Framer Motion powered transitions
- **Accessibility** - ARIA labels and keyboard navigation

### 🔧 Backend Features
- **RESTful API** - Clean FastAPI endpoints with automatic documentation
- **Database Integration** - SQLAlchemy ORM with SQLite
- **Error Handling** - Comprehensive try/catch with proper HTTP status codes
- **CORS Enabled** - Cross-origin requests for frontend integration
- **Data Validation** - Pydantic schemas for type safety

## 📊 Database Overview

### Pre-loaded Data
- **10 Categories**: Air Mattress, Auto CPAP, BiPAP, DVT/Lymph Pump, Feeding, Hospital Bed, Oxygen, Monitor, Suction, Ventilator
- **41 Products**: Complete medical equipment inventory
- **Pricing Range**: ₹3,000 - ₹81,000 (varies by equipment and duration)

### Sample Categories & Products
```
🏥 Hospital Beds (6 products)
   - ICU Beds, Semi-Fowler Beds, Fowler Beds
   - Prices: ₹12,000 - ₹45,000/month

🫁 Respiratory Equipment (16 products)
   - CPAP, BiPAP, Oxygen Concentrators, Ventilators
   - Prices: ₹8,000 - ₹81,000/month

🛏️ Support Surfaces (3 products)
   - Air Mattresses for pressure relief
   - Prices: ₹3,000 - ₹15,000/month
```

## 🏗️ Project Architecture

```
CareSpace-Enterprise/
├── backend/                      # FastAPI Backend
│   ├── app/
│   │   ├── core/                # Database & dependencies
│   │   │   ├── database.py      # SQLAlchemy setup
│   │   │   └── deps.py          # FastAPI dependencies
│   │   ├── models/              # Database models
│   │   │   ├── category.py      # Equipment categories
│   │   │   ├── product.py       # Medical equipment
│   │   │   ├── lead.py          # Customer inquiries
│   │   │   └── user.py          # User management
│   │   ├── routes/              # API endpoints
│   │   │   ├── categories.py    # Category CRUD
│   │   │   ├── products.py      # Product CRUD & search
│   │   │   ├── leads.py         # Lead management
│   │   │   └── auth.py          # Authentication (planned)
│   │   └── schemas/             # Pydantic validation
│   │       ├── category.py
│   │       ├── product.py
│   │       ├── lead.py
│   │       └── user.py
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables
│
├── Frontend/                     # React Frontend
│   ├── src/
│   │   ├── app/                 # Main application
│   │   │   ├── components/      # Reusable components
│   │   │   │   ├── Navbar.tsx   # Advanced responsive navbar
│   │   │   │   ├── Button.tsx
│   │   │   │   └── ui/          # UI component library
│   │   │   └── pages/           # Page components
│   │   ├── services/            # API integration
│   │   │   └── api.ts           # Axios API client
│   │   ├── data/                # Static data
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript definitions
│   │   └── utils/               # Utility functions
│   ├── public/                  # Static assets
│   │   ├── images/              # Product images
│   │   └── logo.png             # Company logo
│   ├── package.json             # Node dependencies
│   ├── vite.config.ts           # Vite configuration
│   └── tsconfig.json            # TypeScript config
│
├── seed_data.py                 # Database seeding script
├── update_images.py             # Image management utility
├── carespace.db                 # SQLite database
├── run_all.bat                  # One-click startup script
├── run_backend.bat              # Backend startup script
├── run_frontend.bat             # Frontend startup script
└── README.md                    # This documentation
```

## 📡 API Endpoints

### Categories API
```http
GET    /api/categories           # List all categories
GET    /api/categories/{slug}    # Get category by slug
POST   /api/categories           # Create new category
```

### Products API
```http
GET    /api/products                    # List all products (paginated)
GET    /api/products/{slug}             # Get product details
GET    /api/products/category/{slug}    # Products by category
GET    /api/products/{slug}/related     # Related products
GET    /api/products/search?q=query     # Search products
POST   /api/products                    # Create new product
```

### Leads API
```http
GET    /api/leads               # List all leads
GET    /api/leads/{id}          # Get lead by ID
POST   /api/leads               # Create new lead
```

### System API
```http
GET    /                        # API information
GET    /health                  # Health check
GET    /docs                    # Swagger UI documentation
GET    /redoc                   # Alternative API docs
```

## 🔧 Technical Stack

### Backend
- **Framework**: FastAPI (modern Python web framework)
- **Database**: SQLite with SQLAlchemy ORM
- **Validation**: Pydantic schemas
- **Documentation**: Automatic Swagger/ReDoc generation
- **CORS**: Enabled for frontend integration

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and building)
- **Styling**: Tailwind CSS v4 with custom utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks
- **Routing**: React Router v6

### Development Tools
- **Version Control**: Git
- **IDE**: VS Code with recommended extensions
- **Testing**: Manual testing with API docs
- **Deployment**: Ready for production builds

## 🚀 Deployment

### Backend Deployment
```bash
# Production server
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend Deployment
```bash
# Build for production
cd Frontend
npm run build

# Serve static files
npm run preview  # or deploy dist/ folder
```

## 🐛 Recent Fixes & Updates

### ✅ Critical Issues Resolved
- **Server Stability**: Fixed import conflicts causing crashes
- **Data Validation**: Separated Pydantic Create/Out schemas
- **Database Fields**: Added missing `youtube_url` field
- **Error Handling**: Comprehensive try/catch in all routes
- **Concurrent Access**: SQLite WAL mode for stability

### 🔧 Backend Improvements
1. **Database Configuration**
   - WAL mode enabled for concurrent access
   - Foreign key constraints activated
   - Connection pooling optimized

2. **API Reliability**
   - All endpoints wrapped with error handling
   - Proper HTTP status codes
   - Input validation strengthened

3. **Schema Separation**
   - `ProductCreate` for input validation
   - `ProductOut` for response formatting
   - Clear separation of concerns

## 📝 API Usage Examples

### Create a Product
```bash
curl -X POST http://127.0.0.1:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ICU Hospital Bed",
    "slug": "icu-bed",
    "category_id": "bed-category-uuid",
    "price_1month": 12000,
    "price_2month": 22800,
    "price_3month": 32400,
    "description": "5-function automatic ICU bed",
    "image_url": "https://example.com/bed.jpg",
    "youtube_url": "https://youtube.com/watch?v=demo"
  }'
```

### Search Products
```bash
curl "http://127.0.0.1:8000/api/products/search?q=cpap"
```

### Create a Lead
```bash
curl -X POST http://127.0.0.1:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+91-9876543210",
    "email": "john@example.com",
    "product_id": "product-uuid",
    "message": "Interested in renting CPAP machine"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- **GitHub Issues**: Report bugs or request features
- **API Documentation**: http://127.0.0.1:8000/docs
- **Project Structure**: See component files in `Frontend/src/app/components/` for detailed implementation

---

**CareSpace Enterprise** - Your trusted partner in medical equipment rental management. 🏥✨
