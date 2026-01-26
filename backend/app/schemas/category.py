from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: str | None = None

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: str

    class Config:
        from_attributes = True
