from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False, index=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    description = Column(String, nullable=True)
    
    # Relationship to products
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")
    
    @property
    def product_count(self) -> int:
        """Return the count of products in this category. Always returns int >= 0."""
        if self.products is None:
            return 0
        return len(self.products)
    
    def __repr__(self):
        return f"<Category(id={self.id}, name={self.name}, slug={self.slug})>"

