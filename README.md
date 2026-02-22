# Carespace India - Medical Equipment Rental Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/react-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-brightgreen.svg)]()

**Complete medical equipment rental management system** with advanced SEO optimization, modern responsive design, and comprehensive backend API. Built for healthcare providers and patients seeking quality medical equipment rental services in Mumbai and across India.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🌐 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🎯 SEO & Performance](#-seo--performance)
- [📊 Database Overview](#-database-overview)
- [🏗️ Project Architecture](#️-project-architecture)
- [📡 API Endpoints](#-api-endpoints)
- [🔧 Technical Stack](#-technical-stack)
- [🚀 Deployment](#-deployment)
- [🧹 Project Maintenance](#-project-maintenance)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 API Usage Examples](#-api-usage-examples)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

## 🚀 Quick Start

### Prerequisites
- **Python 3.9+** with pip
- **Node.js 18+** with npm
- **Git** for cloning


### Moving Project to Another Computer (with Data)

Follow these steps to zip your project, move it, and ensure all data is seeded properly in PostgreSQL on another computer:

#### 1. Zip Your Project Folder
- Right-click your `CareSpace-Enterprise` folder and select “Send to > Compressed (zipped) folder.”
- Or, run this in PowerShell:
   ```powershell
   Compress-Archive -Path "d:\meet\CareSpace-Enterprise" -DestinationPath "d:\meet\CareSpace-Enterprise.zip"
   ```

#### 2. Copy and Extract
- Copy the ZIP file to the new computer and extract it.

#### 3. Set Up Backend (Python)
- Install Python (same version as before).
- Open a terminal in the backend folder.
- Create a virtual environment:
   ```bash
   python -m venv ../venv
   ```
- Activate the virtual environment:
   ```bash
   ../venv/Scripts/activate
   ```
- Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

#### 4. Set Up Frontend (Node.js)
- Install Node.js (same version as before).
- Open a terminal in the Frontend folder.
- Run:
   ```bash
   npm install
   ```

#### 5. Set Up PostgreSQL and Seed Data
- Install PostgreSQL and create a database (same name as before).
- Update your `.env` file with the correct database credentials if needed.
- Run your seed or migration scripts to populate the database:
   ```bash
   python seed_data.py
   # or
   python backend/migrate_add_key_features.py
   ```

#### 6. Start Backend and Frontend Servers
- Backend: Run the backend server (e.g., using uvicorn).
- Frontend: Run the frontend dev server (e.g., npm run dev).

This will ensure your code, dependencies, and database are all set up and seeded properly on the new computer.

---

### One-Command Setup (Windows)
```bash
# Clone repository
git clone https://github.com/yourusername/CareSpace-Enterprise.git
cd CareSpace-Enterprise

# Setup backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Setup database
cd ..
python seed_data.py

# Setup frontend
cd Frontend
npm install
npm run build

# Start both servers
# Terminal 1 - Backend (Port 8001)
cd backend
../venv/Scripts/uvicorn.exe app.main:app --host 127.0.0.1 --port 8001

# Terminal 2 - Frontend (Port 5174)
cd Frontend
npm run dev
```

### Environment Configuration

#### Backend Environment
The backend uses SQLite by default. For PostgreSQL in production:
```bash
# Set environment variable
DATABASE_URL=postgresql://username:password@host:5432/carespace_db
```

#### Frontend Environment
Create/update `Frontend/.env`:
```bash
# For local development
VITE_API_URL=http://127.0.0.1:8001

# For production
# VITE_API_URL=https://your-deployed-backend-url.vercel.app
```

### Database Setup

#### For Development (SQLite - Default)
The app uses SQLite by default for easy development setup. No additional configuration needed.

#### For Production (PostgreSQL - Enterprise)
1. **Install PostgreSQL** locally or use a cloud service (Vercel Postgres, AWS RDS, etc.)
2. **Create a database** named `carespace_db`
3. **Set environment variable**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your PostgreSQL connection string
   DATABASE_URL=postgresql://username:password@localhost:5432/carespace_db
   ```
4. **Run migrations** (if needed):
   ```bash
   cd backend
   python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
   ```

#### Cloud Database Options
- **Vercel Postgres**: Integrated with Vercel deployments
- **AWS RDS**: Managed PostgreSQL service
- **Google Cloud SQL**: Enterprise-grade PostgreSQL
- **Supabase**: Open-source Firebase alternative

## 🌐 Live Demo

- **🏠 Homepage**: http://localhost:5174
- **🔧 Backend API**: http://127.0.0.1:8001
- **📚 API Documentation**: http://127.0.0.1:8001/docs
- **❤️ Health Check**: http://127.0.0.1:8001/health
- **🗺️ Sitemap**: http://localhost:5174/sitemap.xml
- **🤖 Robots.txt**: http://localhost:5174/robots.txt

## ✨ Features


### 🏥 Core Healthcare Features
* **📦 Equipment Inventory** - 41 medical equipment products across 10 categories
* **💰 Dynamic Pricing** - Flexible 1-month, 2-month, and 3-month rental plans
* **🏷️ Category Management** - Organized equipment categories (Hospital Beds, CPAP/BiPAP, Oxygen, etc.)
* **🔍 Advanced Search** - Real-time product search with filtering
* **📞 Lead Management** - Customer inquiry capture and management system
* **📱 WhatsApp Integration** - Direct customer communication
* **📧 Contact Forms** - Professional inquiry handling

### 🔑 Recent UI Changes
* **Login Page Slideshow**: The login page now features a slideshow of local images for enhanced visual appeal.
* **Branding Update**: The logo and branding have been removed from the login page for a cleaner look.
* **Performance Improvements**: Login page animations and image loading have been optimized for faster interaction and reduced lag.
* **Social Login Update**: Only the Google login button remains, now using the official Google logo.
* **UI Isolation**: The login page is fully isolated from the UI directory and does not depend on shared UI components.
* **Promotional Text Removal**: Product pages no longer display promotional text (e.g., "Flexible rental plans available • Free delivery").
* **Image Cropping Fix**: Slideshow images are now properly cropped and displayed using object-fit for consistent appearance.
* **Git Workflow**: All recent changes have been committed and pushed to the repository.

### 🎨 Frontend Excellence
- **📱 Responsive Design** - Mobile-first approach (320px to 4K displays)
- **🎭 Modern UI/UX** - Glassmorphism effects with Tailwind CSS
- **🎬 Smooth Animations** - Framer Motion powered transitions
- **♿ Accessibility** - WCAG compliant with ARIA labels
- **🌙 Dark/Light Modes** - Theme switching capability
- **⚡ Performance** - Vite-powered fast loading (<2s first contentful paint)

### 🔧 Backend Power
- **🚀 RESTful API** - Clean FastAPI endpoints with automatic OpenAPI docs
- **🗄️ Database Integration** - SQLAlchemy ORM with PostgreSQL/SQLite support (enterprise-ready)
- **✅ Data Validation** - Pydantic schemas with comprehensive error handling
- **🔒 Security** - CORS enabled, input sanitization, SQL injection protection
- **📊 Analytics Ready** - Structured data for business intelligence

## 🎯 SEO & Performance

### 🔍 Advanced SEO Features
- **📝 Dynamic Meta Tags** - Product-specific titles, descriptions, and Open Graph
- **🗺️ Auto-Generated Sitemap** - XML sitemap with 57+ URLs for search engines
- **🤖 Robots.txt** - Search engine crawling instructions
- **🔗 Canonical URLs** - Duplicate content prevention
- **📱 Social Media** - Open Graph and Twitter Card optimization
- **⚡ Core Web Vitals** - Optimized for Google's performance metrics

### 📈 SEO Implementation
- **Schema Markup** - JSON-LD structured data for rich snippets
- **Meta Descriptions** - Compelling 155-character descriptions
- **Image Optimization** - Alt texts and lazy loading
- **Mobile SEO** - Responsive design with mobile-first indexing
- **Page Speed** - Vite build optimization (<100KB gzipped JS)

### 🎯 SEO Results
- **Search Visibility**: Optimized for "medical equipment rental Mumbai"
- **Social Sharing**: Rich previews on Facebook, WhatsApp, LinkedIn
- **Local SEO**: Mumbai-focused content and contact information
- **Rich Snippets**: Potential for star ratings and price displays

## 📊 Database Overview

### Pre-loaded Healthcare Data
- **🏥 10 Categories**: Air Mattress, Auto CPAP, BiPAP, DVT/Lymph Pump, Feeding, Hospital Bed, Oxygen, Monitor, Suction, Ventilator
- **📦 41 Products**: Complete medical equipment inventory
- **💰 Price Range**: ₹3,000 - ₹81,000 (duration-based pricing)
- **📍 Coverage**: Mumbai + Pan-India delivery

### Sample Product Categories
```
🏥 Hospital Beds (6 products)
   • ICU Beds, Semi-Fowler Beds, Fowler Beds
   • ₹12,000 - ₹45,000/month

🫁 Respiratory Equipment (16 products)
   • CPAP, BiPAP, Oxygen Concentrators, Ventilators
   • ₹8,000 - ₹81,000/month

🛏️ Support Surfaces (3 products)
   • Air Mattresses for pressure relief
   • ₹3,000 - ₹15,000/month

📊 Patient Monitoring (2 products)
   • Multi-parameter monitors
   • ₹15,000 - ₹25,000/month
```

## 🏗️ Project Architecture

```
Carespace-India/
├── � .env.example                 # Environment variables template
├── 🗄️ carespace.db                 # SQLite database (development)
├── 🐍 backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── core/                   # Core functionality
│   │   │   ├── database.py         # SQLAlchemy setup
│   │   │   ├── deps.py             # FastAPI dependencies
│   │   │   ├── errors.py           # Error handlers
│   │   │   └── config.py           # App configuration
│   │   ├── models/                 # Database models
│   │   │   ├── category.py         # Equipment categories
│   │   │   ├── product.py          # Medical equipment + SEO fields
│   │   │   ├── lead.py             # Customer inquiries
│   │   │   └── user.py             # User management
│   │   ├── routes/                 # API endpoints
│   │   │   ├── categories.py       # Category CRUD
│   │   │   ├── products.py         # Product CRUD & search
│   │   │   ├── leads.py            # Lead management
│   │   │   ├── auth.py             # Authentication
│   │   │   └── contacts.py         # Contact form handling
│   │   └── schemas/                # Pydantic validation
│   │       ├── category.py
│   │       ├── product.py
│   │       ├── lead.py
│   │       └── user.py
│   ├── generate_sitemap.py         # SEO sitemap generator
│   └── requirements.txt            # Python dependencies
│
├── ⚛️ Frontend/                     # React + TypeScript
│   ├── dist/                       # Production build (8MB)
│   ├── node_modules/               # Dependencies (150MB)
│   ├── public/                     # Static assets
│   │   ├── images/                 # Product images
│   │   ├── sitemap.xml            # Auto-generated sitemap
│   │   ├── robots.txt             # SEO crawling rules
│   │   ├── favicon.ico            # Site favicon
│   │   └── _redirects             # SPA routing
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Reusable UI components
│   │   │   │   ├── ui/            # Shadcn/ui library
│   │   │   │   ├── Navbar.tsx     # Responsive navigation
│   │   │   │   ├── Footer.tsx     # Site footer
│   │   │   │   ├── ProductCard.tsx # Product display
│   │   │   │   └── EnquiryPopup.tsx # Contact forms
│   │   │   └── pages/             # Page components
│   │   │       ├── HomePage.tsx   # Landing page
│   │   │       ├── ProductPage.tsx # Product details
│   │   │       ├── CategoryPage.tsx # Category listings
│   │   │       ├── SearchPage.tsx # Search results
│   │   │       └── AboutPage.tsx  # Company info
│   │   ├── services/              # API integration
│   │   │   └── api.ts             # Axios client
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── types/                 # TypeScript definitions
│   │   └── utils/                 # Helper functions
│   ├── index.html                 # HTML template with SEO
│   ├── package.json               # Node dependencies
│   ├── vite.config.ts             # Build configuration
│   └── tsconfig.json              # TypeScript config
│
├── 📄 Product info/               # Data source files
│   └── Product 1-40.txt          # Product specifications
├── 🛠️ generate_sitemap.py         # Sitemap runner script
├── 🌱 seed_data.py                # Database initialization
├── 🖼️ update_images.py            # Image management
└── 📝 README.md                   # This documentation
```

## 📡 API Endpoints

### 🏷️ Categories API
```http
GET    /api/categories           # List all categories
GET    /api/categories/{slug}    # Get category by slug
POST   /api/categories           # Create new category (admin)
```

### 📦 Products API
```http
GET    /api/products                    # List products (paginated)
GET    /api/products/{slug}             # Get product details + SEO
GET    /api/products/category/{slug}    # Products by category
GET    /api/products/{slug}/related     # Related products
GET    /api/products/search?q=query     # Search products
POST   /api/products                    # Create product (admin)
```

### 📞 Leads & Contacts API
```http
GET    /api/leads               # List all leads
GET    /api/leads/{id}          # Get lead by ID
POST   /api/leads               # Create new lead
POST   /api/contacts            # Contact form submission
```

### 🔧 System API
```http
GET    /                        # API information
GET    /health                  # Health check
GET    /docs                    # Swagger UI documentation
GET    /redoc                   # Alternative API docs
```

## 🔧 Technical Stack

### Backend (FastAPI + Python)
- **🚀 Framework**: FastAPI with async support
- **🗄️ Database**: PostgreSQL/SQLite + SQLAlchemy ORM
- **✅ Validation**: Pydantic v2 schemas
- **📚 Documentation**: Auto-generated Swagger/ReDoc
- **🔒 Security**: CORS, input validation, SQL injection protection
- **⚡ Performance**: Async endpoints, connection pooling

### Frontend (React + TypeScript)
- **⚛️ Framework**: React 18 with hooks
- **📱 Language**: TypeScript for type safety
- **🏗️ Build**: Vite for lightning-fast development
- **🎨 Styling**: Tailwind CSS v4 + custom utilities
- **🎬 Animation**: Framer Motion for smooth UX
- **🔍 SEO**: React Helmet Async for dynamic meta tags

### DevOps & Tools
- **📦 Package Management**: pip (backend), npm (frontend)
- **🗂️ Version Control**: Git with conventional commits
- **🐳 Container Ready**: Dockerfile included
- **📊 Monitoring**: Health checks and error logging
- **🧪 Testing**: API testing with automated scripts

## 🚀 Deployment

### Production Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Production Frontend
```bash
cd Frontend
npm install
npm run build
# Deploy the 'dist' folder to your web server
```

### Vercel Deployment
The backend is configured for Vercel deployment with CORS headers:

1. **Backend Deployment**:
   ```bash
   cd backend
   vercel --prod
   ```

2. **Frontend Deployment**:
   ```bash
   cd Frontend
   vercel --prod
   ```

3. **Update Frontend Environment**:
   After backend deployment, update `Frontend/.env`:
   ```bash
   VITE_API_URL=https://your-vercel-backend-url.vercel.app
   ```

### Docker Deployment (Optional)
```bash
# Build and run with Docker
docker build -t carespace-india .
docker run -p 8000:8000 -p 5173:5173 carespace-india
```

## 🧹 Project Maintenance

### Database Management
```bash
# Reset database
python seed_data.py

# Update product data
python update_products_from_files.py

# Generate SEO sitemap
python generate_sitemap.py
```

### Frontend Maintenance
```bash
cd Frontend
npm audit                    # Security audit
npm update                   # Update dependencies
npm run build               # Production build
```

### File Organization
- **✅ Clean Structure**: Removed 111MB of unnecessary files
- **🔒 Security**: No sensitive data exposed
- **📦 Optimized**: Dependencies properly managed
- **🗂️ Organized**: Clear separation of concerns

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.9+

# Reinstall dependencies
cd backend
pip install -r requirements.txt
```

**Frontend build fails:**
```bash
# Clear cache and reinstall
cd Frontend
rm -rf node_modules package-lock.json
npm install
```

**Database connection issues:**
```bash
# For SQLite (development)
python seed_data.py

# For PostgreSQL (production)
# Ensure DATABASE_URL is set in .env
python -c "from app.core.database import engine; print('DB OK' if engine else 'DB Error')"
```

**SEO sitemap not generating:**
```bash
# Check database connection
python -c "from app.core.database import engine; print('DB OK' if engine else 'DB Error')"

# Run sitemap generator
python generate_sitemap.py
```

## 📝 API Usage Examples

### Search Medical Equipment
```bash
curl "http://127.0.0.1:8000/api/products/search?q=cpap"
```

### Get Product Details with SEO
```bash
curl "http://127.0.0.1:8000/api/products/auto-cpap-machine-rent"
```

### Submit Contact Form
```bash
curl -X POST http://127.0.0.1:8000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "+91-9876543210",
    "subject": "Hospital Bed Rental Inquiry",
    "message": "Need to rent ICU bed for 2 months"
  }'
```

### Create Equipment Lead
```bash
curl -X POST http://127.0.0.1:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Sharma",
    "phone": "+91-9123456789",
    "email": "priya.sharma@email.com",
    "product_id": "icu-bed-uuid",
    "message": "Interested in renting ICU bed for home care"
  }'
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/medical-equipment-search`)
3. **Commit** changes (`git commit -m 'Add advanced search filters'`)
4. **Push** to branch (`git push origin feature/medical-equipment-search`)
5. **Open** a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript strict mode
- Write descriptive commit messages
- Test API endpoints thoroughly
- Ensure mobile responsiveness

## 📄 License

**MIT License** - Open source and free to use commercially.

## 📞 Support & Contact

- **🏥 Website**: https://carespace.in
- **📧 Email**: Info.carespaceindia@gmail.com
- **📱 WhatsApp**: +91 8922069800
- **📚 API Docs**: http://127.0.0.1:8000/docs
- **🐛 Issues**: GitHub Issues for bug reports
- **💡 Features**: GitHub Discussions for suggestions

### Healthcare Support
- **🏥 Medical Equipment**: 24/7 rental support
- **🚚 Delivery**: Pan-India doorstep delivery
- **🔧 Maintenance**: Equipment servicing available
- **📞 Emergency**: Priority support for urgent needs

---

**🏥 Carespace India** - *Making Quality Healthcare Accessible Through Technology* ✨

*Trusted medical equipment rental partner serving Mumbai and across India since 2024.*
