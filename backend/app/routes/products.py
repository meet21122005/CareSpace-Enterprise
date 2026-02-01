from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_
from app.core.deps import get_db
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductOut, ProductDetail, ProductSearchResult

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    """
    Create a new product.
    - category_id must exist in categories table
    - slug must be unique
    - slug must be lowercase with hyphens only
    """
    try:
        # Validate category exists
        category = db.query(Category).filter(Category.id == data.category_id).first()
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Category with id '{data.category_id}' not found"
            )
        
        # Check if slug already exists
        existing_slug = db.query(Product).filter(Product.slug == data.slug).first()
        if existing_slug:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product with slug '{data.slug}' already exists"
            )
        
        product = Product(**data.model_dump())
        db.add(product)
        db.flush()  # Catch constraint errors before commit
        db.commit()
        db.refresh(product)
        return product
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product with this slug already exists or invalid category"
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating product: {str(e)}"
        )


# IMPORTANT: Specific routes MUST come before generic {product_slug} route
@router.get("/search", response_model=List[ProductSearchResult])
def search_products(q: str = Query(..., min_length=1, max_length=255), db: Session = Depends(get_db)):
    """
    Search products by name or category.
    Query string 'q' is required and searches:
    - Product name (case-insensitive)
    - Category name (case-insensitive)
    """
    try:
        search_term = f"%{q.lower()}%"
        
        # Query using columns to avoid relationship issues
        results = (
            db.query(
                Product.id,
                Product.name,
                Product.slug,
                Product.price_1month,
                Product.image_url,
                Product.youtube_url,
                Category.name.label("category_name"),
                Category.slug.label("category_slug")
            )
            .join(Category, Product.category_id == Category.id)
            .filter(
                or_(
                    Product.name.ilike(search_term),
                    Category.name.ilike(search_term)
                )
            )
            .all()
        )
        
        # Convert tuples to schema objects
        search_results = [
            ProductSearchResult(
                id=row.id,
                name=row.name,
                slug=row.slug,
                category_name=row.category_name,
                category_slug=row.category_slug,
                price_1month=row.price_1month,
                image_url=row.image_url,
                youtube_url=row.youtube_url
            )
            for row in results
        ]
        
        return search_results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )


@router.get("/category/{category_slug}", response_model=List[ProductOut])
def get_products_by_category(
    category_slug: str, 
    db: Session = Depends(get_db)
):
    """
    Get all products in a specific category by category slug.
    Returns empty list if category has no products.
    Returns 404 if category doesn't exist.
    """
    try:
        category = db.query(Category).filter(Category.slug == category_slug).first()
        if not category:
            raise HTTPException(status_code=404, detail=f"Category '{category_slug}' not found")
        
        products = db.query(Product).filter(Product.category_id == category.id).all()
        return products
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving products: {str(e)}"
        )


@router.get("/{product_slug}", response_model=ProductDetail)
def get_product(product_slug: str, db: Session = Depends(get_db)):
    """
    Get a single product by slug.
    Returns 404 if product not found.
    """
    try:
        product = db.query(Product).filter(Product.slug == product_slug).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product '{product_slug}' not found")
        
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving product: {str(e)}"
        )


@router.get("/{product_slug}/related", response_model=List[ProductOut])
def get_related_products(
    product_slug: str,
    db: Session = Depends(get_db)
):
    """
    Get related products (same category, exclude current, max 4 items).
    Returns 404 if product not found.
    """
    try:
        product = db.query(Product).filter(Product.slug == product_slug).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product '{product_slug}' not found")
        
        related = (
            db.query(Product)
            .filter(
                Product.category_id == product.category_id,
                Product.id != product.id
            )
            .limit(4)
            .all()
        )
        
        return related
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving related products: {str(e)}"
        )


@router.get("/", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    """
    Get all products (41 total).
    Returns all available products for rental.
    """
    try:
        products = db.query(Product).all()
        if not products:
            return []
        return products
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving products: {str(e)}"
        )

