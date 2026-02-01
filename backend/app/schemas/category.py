from typing import Optional, List
from pydantic import BaseModel, Field

class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255, pattern=r'^[a-z0-9\-]+$')
    description: Optional[str] = None

class CategoryOut(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    product_count: int = 0

    class Config:
        from_attributes = True

class CategoryWithProducts(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    product_count: int = 0
    products: Optional[List['ProductOut']] = []

    class Config:
        from_attributes = True

from app.schemas.product import ProductOut
CategoryWithProducts.model_rebuild()

