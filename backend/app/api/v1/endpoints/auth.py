from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User, UserProfile
from app.schemas.user import UserCreate, UserOut, Token
from app.core import security
from app.core.config import settings

router = APIRouter()

@router.post("/signup", response_model=UserOut)
def signup(
    *,
    session: Session = Depends(get_session),
    user_in: UserCreate
) -> Any:
    """
    Create new user.
    """
    # Check if user with this email already exists
    statement = select(User).where(User.email == user_in.email)
    user = session.exec(statement).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Check if user with this username already exists
    statement = select(User).where(User.username == user_in.username)
    user = session.exec(statement).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    
    # Create new user
    db_obj = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=security.get_password_hash(user_in.password),
        is_active=user_in.is_active,
    )
    session.add(db_obj)
    session.flush()  # Flush to get the ID without committing

    # Create user profile
    profile_obj = UserProfile(
        user_id=db_obj.id,
        fullname=user_in.fullname,
        email=user_in.email,
    )
    session.add(profile_obj)
    
    session.commit()
    session.refresh(db_obj)
    
    return db_obj

@router.post("/login", response_model=Token)
def login(
    session: Session = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # Try to find user by email first, then username
    statement = select(User).where((User.email == form_data.username) | (User.username == form_data.username))
    user = session.exec(statement).first()
    
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
