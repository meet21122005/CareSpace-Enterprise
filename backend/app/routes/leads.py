from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.core.deps import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadOut

router = APIRouter(prefix="/api/leads", tags=["Leads"])

@router.post("/", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
def create_lead(data: LeadCreate, db: Session = Depends(get_db)):
    """
    Create a new lead from a customer inquiry.
    """
    try:
        lead = Lead(**data.model_dump())
        db.add(lead)
        db.flush()  # Catch constraint errors before commit
        db.commit()
        db.refresh(lead)
        return lead
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid lead data"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating lead: {str(e)}"
        )


@router.get("/", response_model=List[LeadOut])
def get_leads(db: Session = Depends(get_db)):
    """
    Get all leads.
    """
    try:
        leads = db.query(Lead).all()
        return leads
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving leads: {str(e)}"
        )


@router.get("/{lead_id}", response_model=LeadOut)
def get_lead(lead_id: str, db: Session = Depends(get_db)):
    """
    Get a single lead by ID.
    """
    try:
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        return lead
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving lead: {str(e)}"
        )
