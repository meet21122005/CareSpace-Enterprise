from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryOut

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.post("/", response_model=CategoryOut)
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    category = Category(**data.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.get("/", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@router.get("/{slug}", response_model=CategoryOut)
def get_category(slug: str, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.slug == slug).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
