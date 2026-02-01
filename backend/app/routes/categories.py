from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.core.deps import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryOut

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.post("/", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    """
    Create a new category.
    Slug must be unique and lowercase with hyphens only.
    """
    try:
        # Check if slug already exists
        existing = db.query(Category).filter(Category.slug == data.slug).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Category with slug '{data.slug}' already exists"
            )
        
        # Check if name already exists
        existing_name = db.query(Category).filter(Category.name == data.name).first()
        if existing_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Category with name '{data.name}' already exists"
            )
        
        category = Category(**data.model_dump())
        db.add(category)
        db.flush()  # Flush to catch constraint errors before commit
        db.commit()
        db.refresh(category)
        return category
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this slug or name already exists"
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating category: {str(e)}"
        )


@router.get("/", response_model=List[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    """
    Get all categories (10 total) with product count for each.
    Returns all medical equipment rental categories.
    """
    try:
        categories = db.query(Category).all()
        if not categories:
            return []
        return categories
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving categories: {str(e)}"
        )


@router.get("/{category_slug}", response_model=CategoryOut)
def get_category(category_slug: str, db: Session = Depends(get_db)):
    """
    Get a single category by slug with product count.
    Returns 404 if category not found.
    """
    try:
        category = db.query(Category).filter(Category.slug == category_slug).first()
        if not category:
            raise HTTPException(status_code=404, detail=f"Category '{category_slug}' not found")
        
        return category
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving category: {str(e)}"
        )
