from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class LeadBase(BaseModel):
    name: str
    phone: str
    source: str
    product: Optional[str] = None
    page_url: Optional[str] = None
    message: Optional[str] = None

class LeadCreate(LeadBase):
    pass

class LeadOut(LeadBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
