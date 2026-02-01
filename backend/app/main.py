import sys
from pathlib import Path
from typing import List

# Add backend directory to path so imports work when run directly
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine

from app.routes import categories, products, leads

from app.models import category, product, lead

# Create all tables
Base.metadata.create_all(bind=engine)

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
