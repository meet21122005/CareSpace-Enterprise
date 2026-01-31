from sqlalchemy import Column, String
from app.core.database import Base
import uuid

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
