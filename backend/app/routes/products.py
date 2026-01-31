from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from uuid import uuid4
from app.core.deps import get_db
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductOut, ProductResponse

def get_price_by_duration(product: Product, duration: str) -> Optional[int]:
    """Get price based on duration"""
    if duration == "1month":
        return product.price_1month
    elif duration == "2month":
        return product.price_2month
    elif duration == "3month":
        return product.price_3month
    return product.price_1month  # default

def product_to_response(product: Product, duration: str) -> ProductResponse:
    """Convert product to response with selected duration price"""
    return ProductResponse(
        id=product.id,
        name=product.name,
        slug=product.slug,
        category_id=product.category_id,
        price=get_price_by_duration(product, duration),
        duration=duration
    )

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.post("/", response_model=ProductOut, status_code=201)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    try:
        product = Product(
            id=str(uuid4()),
            name=data.name,
            slug=data.slug,
            category_id=data.category_id,
            price_1month=data.price_1month,
            price_2month=data.price_2month,
            price_3month=data.price_3month
        )
        db.add(product)
        db.commit()
        db.refresh(product)
        return product
    except IntegrityError as e:
        db.rollback()
        if "UNIQUE constraint failed" in str(e):
            raise HTTPException(status_code=400, detail="Product slug already exists")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db), duration: str = Query("1month", description="Duration: 1month, 2month, or 3month")):
    products = db.query(Product).all()
    return [product_to_response(p, duration) for p in products]


@router.get("/category/{category_slug}", response_model=List[ProductResponse])
def get_products_by_category(category_slug: str, db: Session = Depends(get_db), duration: str = Query("1month", description="Duration: 1month, 2month, or 3month")):
    category = db.query(Category).filter(Category.slug == category_slug).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    products = db.query(Product).filter(Product.category_id == category.id).all()
    return [product_to_response(p, duration) for p in products]


@router.get("/{slug}", response_model=ProductResponse)
def get_product(slug: str, db: Session = Depends(get_db), duration: str = Query("1month", description="Duration: 1month, 2month, or 3month")):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_to_response(product, duration)
