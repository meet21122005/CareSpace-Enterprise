import sys
from pathlib import Path

# Add backend directory to path so imports work when run directly
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from app.core.database import Base, engine

from app.routes import categories, products

from app.models import category, product, lead

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareSpace Enterprise API")

app.include_router(categories.router)
app.include_router(products.router)

@app.get("/")
def root():
    return {"status": "CareSpace backend running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)