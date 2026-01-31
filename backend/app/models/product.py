from sqlalchemy import Column, String, Integer, ForeignKey, Text
from app.core.database import Base
import uuid

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    category_id = Column(String, ForeignKey("categories.id"), nullable=True)

    price_1month = Column(Integer, nullable=True)
    price_2month = Column(Integer, nullable=True)
    price_3month = Column(Integer, nullable=True)
    
    # New fields for UI
    image_url = Column(String, nullable=True)  # Product photo URL
    description = Column(Text, nullable=True)  # Detailed description
    specifications = Column(Text, nullable=True)  # Tech specs (JSON format)
