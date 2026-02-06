from typing import Optional
from pydantic import BaseModel, Field

class ProductCreate(BaseModel):
    """Schema for creating a new product."""
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255, pattern=r'^[a-z0-9\-]+$')
    category_id: str
    price_1month: Optional[int] = Field(None, ge=0)
    price_2month: Optional[int] = Field(None, ge=0)
    price_3month: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = None
    description: Optional[str] = None
    specifications: Optional[str] = None
    youtube_url: Optional[str] = None
    seo_meta_title: Optional[str] = None
    seo_meta_description: Optional[str] = None

class ProductOut(BaseModel):
    """Schema for product responses (list/detail)."""
    id: str
    name: str
    slug: str
    category_id: str
    price_1month: Optional[int] = None
    price_2month: Optional[int] = None
    price_3month: Optional[int] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    specifications: Optional[str] = None
    youtube_url: Optional[str] = None
    seo_meta_title: Optional[str] = None
    seo_meta_description: Optional[str] = None

    class Config:
        from_attributes = True

class ProductDetail(ProductOut):
    """Schema for detailed product view."""
    pass

class ProductSearchResult(BaseModel):
    """Schema for search results."""
    id: str
    name: str
    slug: str
    category_name: str
    category_slug: str
    price_1month: Optional[int] = None
    image_url: Optional[str] = None
    youtube_url: Optional[str] = None

    class Config:
        from_attributes = True

