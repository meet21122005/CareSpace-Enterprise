from sqlalchemy import Column, String, Integer, ForeignKey
from app.core.database import Base
import uuid

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    category_id = Column(String, ForeignKey("categories.id"))

    daily_price = Column(Integer)
    weekly_price = Column(Integer)
    monthly_price = Column(Integer)
