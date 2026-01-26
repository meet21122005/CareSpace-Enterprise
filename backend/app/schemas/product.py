from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    slug: str
    category_id: str
    daily_price: int
    weekly_price: int
    monthly_price: int

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: str

    class Config:
        from_attributes = True
