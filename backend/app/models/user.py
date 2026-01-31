from sqlalchemy import Column, String, Boolean, DateTime
from app.core.database import Base
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    password_hash = Column(String, nullable=True)  # Hashed password - nullable for Google OAuth
    full_name = Column(String, nullable=True)
    google_id = Column(String, unique=True, nullable=True)  # Google OAuth ID
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
