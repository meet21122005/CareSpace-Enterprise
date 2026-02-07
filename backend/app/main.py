import sys
from pathlib import Path
from typing import List

# Add backend directory to path so imports work when run directly
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine, SessionLocal

from app.routes import categories, products, leads

from app.models import category, product, lead

# Create all tables
Base.metadata.create_all(bind=engine)

# Seed data for in-memory database
def seed_database():
    """Seed the database with categories and products for serverless deployment."""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        from app.models.category import Category
        if db.query(Category).first():
            return  # Data already seeded
        
        # Define categories
        categories_data = [
            ("Air Mattress", "air-mattress-rent", "Pressure relief air mattresses"),
            ("Auto CPAP", "auto-cpap-rent", "Automatic CPAP devices"),
            ("BiPAP", "bipap-rent", "BiPAP sleep apnea devices"),
            ("DVT / Lymph Pump", "dvt-lymph-pump-rent", "DVT pumps and lymphatic devices"),
            ("Feeding Infusion Syringe", "feeding-infusion-syringe-rent", "Feeding and infusion syringes"),
            ("Hospital Bed", "hospital-bed-rent", "Hospital beds with various features"),
            ("Oxygen Concentrator", "oxygen-concentrator-rent", "Oxygen concentrator devices"),
            ("Patient Monitor", "patient-monitor-rent", "Multi-parameter patient monitors"),
            ("Suction Machine", "suction-machine-rent", "Suction devices for medical use"),
            ("Ventilator", "ventilator-rent", "Mechanical ventilators"),
        ]
        
        categories = {}
        for name, slug, description in categories_data:
            cat = Category(name=name, slug=slug, description=description)
            db.add(cat)
            db.flush()
            categories[slug] = cat.id
        
        # Define products
        from app.models.product import Product
        products_data = [
            # Air Mattress products
            ("Bubble Air Mattress", "bubble-air-mattress", "Alternating pressure relief mattress", 1500, "per month", categories["air-mattress-rent"], "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", "Professional alternating pressure air mattress for pressure sore prevention"),
            ("Gel Air Mattress", "gel-air-mattress", "Gel overlay air mattress", 1200, "per month", categories["air-mattress-rent"], "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "Comfortable gel air mattress for patient comfort"),
            
            # Auto CPAP products
            ("ResMed AutoSet", "resmed-autoset", "Auto-adjusting CPAP machine", 2500, "per month", categories["auto-cpap-rent"], "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400", "Advanced auto-adjusting CPAP for sleep apnea treatment"),
            ("Philips DreamStation Auto CPAP", "philips-dreamstation-auto", "Auto CPAP with humidification", 2200, "per month", categories["auto-cpap-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "Auto-adjusting CPAP with integrated humidifier"),
            
            # BiPAP products
            ("ResMed BiPAP Auto", "resmed-bipap-auto", "Auto-adjusting BiPAP machine", 3500, "per month", categories["bipap-rent"], "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", "Advanced BiPAP for complex sleep apnea cases"),
            ("Philips BiPAP AutoSV", "philips-bipap-autosv", "Auto-adjusting BiPAP with backup rate", 3800, "per month", categories["bipap-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "BiPAP with automatic adjustment and backup ventilation"),
            
            # DVT / Lymph Pump products
            ("Sequential Compression Device", "sequential-compression-device", "DVT prevention pump", 800, "per month", categories["dvt-lymph-pump-rent"], "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "Sequential compression device for DVT prevention"),
            ("Lymphatic Drainage Pump", "lymphatic-drainage-pump", "Lymph edema treatment pump", 900, "per month", categories["dvt-lymph-pump-rent"], "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400", "Advanced lymphatic drainage system"),
            
            # Feeding Infusion Syringe products
            ("Enteral Feeding Pump", "enteral-feeding-pump", "Accurate feeding pump", 600, "per month", categories["feeding-infusion-syringe-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "Precise enteral feeding pump for nutritional support"),
            ("Syringe Infusion Pump", "syringe-infusion-pump", "Programmable syringe pump", 550, "per month", categories["feeding-infusion-syringe-rent"], "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", "Accurate syringe infusion pump for medication delivery"),
            
            # Hospital Bed products
            ("Electric Hospital Bed", "electric-hospital-bed", "5-function electric bed", 3000, "per month", categories["hospital-bed-rent"], "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "Full electric hospital bed with 5 functions"),
            ("Semi-Electric Hospital Bed", "semi-electric-hospital-bed", "3-function semi-electric bed", 2500, "per month", categories["hospital-bed-rent"], "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400", "Semi-electric hospital bed with head and foot adjustment"),
            ("Manual Hospital Bed", "manual-hospital-bed", "Manual adjustable bed", 1500, "per month", categories["hospital-bed-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "Manual hospital bed for basic patient care"),
            
            # Oxygen Concentrator products
            ("5L Oxygen Concentrator", "5l-oxygen-concentrator", "5 liter oxygen concentrator", 1800, "per month", categories["oxygen-concentrator-rent"], "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", "Reliable 5L oxygen concentrator for home use"),
            ("10L Oxygen Concentrator", "10l-oxygen-concentrator", "10 liter oxygen concentrator", 2500, "per month", categories["oxygen-concentrator-rent"], "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "High-flow 10L oxygen concentrator"),
            
            # Patient Monitor products
            ("Multi-Parameter Monitor", "multi-parameter-monitor", "5-parameter patient monitor", 2000, "per month", categories["patient-monitor-rent"], "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400", "Complete vital signs monitoring system"),
            ("Portable Patient Monitor", "portable-patient-monitor", "Portable vital signs monitor", 1500, "per month", categories["patient-monitor-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "Portable patient monitor for spot checks"),
            
            # Suction Machine products
            ("Electric Suction Machine", "electric-suction-machine", "High-vacuum suction unit", 800, "per month", categories["suction-machine-rent"], "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400", "Powerful electric suction machine for medical procedures"),
            ("Portable Suction Unit", "portable-suction-unit", "Battery operated suction device", 600, "per month", categories["suction-machine-rent"], "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400", "Portable suction unit for emergency use"),
            
            # Ventilator products
            ("ICU Ventilator", "icu-ventilator", "Full-featured ICU ventilator", 15000, "per month", categories["ventilator-rent"], "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400", "Advanced ICU ventilator with multiple modes"),
            ("Transport Ventilator", "transport-ventilator", "Portable transport ventilator", 8000, "per month", categories["ventilator-rent"], "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400", "Portable ventilator for patient transport"),
        ]
        
        for name, slug, description, price, price_unit, category_id, image_url, long_description in products_data:
            prod = Product(
                name=name,
                slug=slug,
                description=description,
                price=price,
                price_unit=price_unit,
                category_id=category_id,
                image_url=image_url,
                long_description=long_description
            )
            db.add(prod)
        
        db.commit()
        print("Database seeded successfully")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

# Seed the database on startup
seed_database()

app = FastAPI(title="CareSpace Enterprise API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(leads.router)

@app.get("/")
def root():
    """Root endpoint - confirms API is running."""
    return {
        "status": "CareSpace backend running",
        "version": "1.0.0",
        "endpoints": {
            "categories": "/api/categories",
            "products": "/api/products",
            "leads": "/api/leads",
            "docs": "/docs",
            "openapi": "/openapi.json"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
