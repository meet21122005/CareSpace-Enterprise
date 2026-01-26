from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductOut

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.post("/", response_model=ProductOut)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("/", response_model=list[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    return db.query(Product).all()


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/category/{category_slug}", response_model=list[ProductOut])
def get_products_by_category(category_slug: str, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.slug == category_slug).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    return db.query(Product).filter(Product.category_id == category.id).all()
