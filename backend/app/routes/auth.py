from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.models.user import User
from app.schemas.user import GoogleLoginRequest, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google-login")
def google_login(request: GoogleLoginRequest, response: Response, db: Session = Depends(get_db)):
    """
    Google OAuth login endpoint.
    Client sends Google email and name, we create/update user and set session.
    """
    # Check if user exists by email or google_id
    user = db.query(User).filter(
        (User.email == request.email) | (User.google_id == request.google_id)
    ).first()
    
    if user:
        # Update existing user's google_id if needed
        if not user.google_id:
            user.google_id = request.google_id
        if user.full_name != request.full_name and request.full_name:
            user.full_name = request.full_name
    else:
        # Create new user
        user = User(
            email=request.email,
            full_name=request.full_name,
            google_id=request.google_id,
            is_active=True
        )
        db.add(user)
    
    db.commit()
    db.refresh(user)
    
    # Set session cookie
    response.set_cookie(key="user_id", value=user.id, httponly=True, max_age=7*24*60*60)
    response.set_cookie(key="user_email", value=user.email, max_age=7*24*60*60)
    
    return {
        "success": True,
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "message": "Successfully logged in with Google"
    }

@router.get("/me", response_model=UserResponse)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    """
    Get current logged-in user info from session cookie.
    """
    user_id = request.cookies.get("user_id")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        created_at=user.created_at
    )

@router.post("/logout")
def logout(response: Response):
    """
    Logout by clearing session cookies.
    """
    response.delete_cookie("user_id")
    response.delete_cookie("user_email")
    return {"message": "Successfully logged out"}
