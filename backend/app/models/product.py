from sqlalchemy import Column, String, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, nullable=False, index=True)
    category_id = Column(String, ForeignKey("categories.id"), nullable=False)
    
    price_1month = Column(Integer, nullable=False, default=0)
    price_2month = Column(Integer, nullable=False, default=0)
    price_3month = Column(Integer, nullable=False, default=0)
    
    image_url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    specifications = Column(Text, nullable=True)
    key_features = Column(Text, nullable=True)
    youtube_url = Column(String, nullable=True)
    
    # SEO fields
    seo_meta_title = Column(String, nullable=True)
    seo_meta_description = Column(Text, nullable=True)
    
    # Relationship to category
    category = relationship("Category", back_populates="products")
    
    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, slug={self.slug}, category_id={self.category_id})>"

