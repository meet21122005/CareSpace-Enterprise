from sqlalchemy import Column, String, DateTime, Text
from app.core.database import Base
from datetime import datetime
import uuid

class Lead(Base):
    __tablename__ = "leads"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    phone = Column(String, index=True)
    source = Column(String)  # whatsapp, call, popup, form
    product = Column(String)
    page_url = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
