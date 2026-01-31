from typing import Optional
from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    slug: str
    category_id: Optional[str] = None
    price_1month: Optional[int] = None
    price_2month: Optional[int] = None
    price_3month: Optional[int] = None
    image_url: Optional[str] = None  # Product photo
    description: Optional[str] = None  # Detailed description
    specifications: Optional[str] = None  # Specs (JSON)

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: str

    class Config:
        from_attributes = True

class ProductResponse(BaseModel):
    id: str
    name: str
    slug: str
    category_id: Optional[str] = None
    price: Optional[int] = None
    duration: str = "1month"
    image_url: Optional[str] = None  # Product photo
    description: Optional[str] = None  # Detailed description
    specifications: Optional[str] = None  # Specs (JSON)

    class Config:
        from_attributes = True
