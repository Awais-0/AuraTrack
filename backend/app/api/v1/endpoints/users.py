from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import User, UserProfile
from app.schemas.user import UserOut, UserProfileUpdate, UserProfileOut
from app.core.config import settings
from app.services.cloudinary import upload_image

router = APIRouter()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_current_user(
    session: Session = Depends(get_session),
    token: str = Depends(reusable_oauth2)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me", response_model=UserOut)
def read_user_me(
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user

@router.get("/me/profile", response_model=UserProfileOut)
def read_user_profile(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
) -> Any:
    """
    Get current user's profile.
    """
    statement = select(UserProfile).where(UserProfile.user_id == current_user.id)
    profile = session.exec(statement).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.patch("/me/profile", response_model=UserProfileOut)
def update_user_profile(
    *,
    session: Session = Depends(get_session),
    profile_in: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update current user's profile.
    """
    statement = select(UserProfile).where(UserProfile.user_id == current_user.id)
    db_profile = session.exec(statement).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_profile, field, value)
    
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile

@router.post("/me/avatar", response_model=UserProfileOut)
async def upload_avatar(
    *,
    session: Session = Depends(get_session),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Upload user avatar.
    """
    # Upload to Cloudinary
    image_url = upload_image(file.file)
    if not image_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload image to Cloudinary"
        )
    
    # Update profile in database
    statement = select(UserProfile).where(UserProfile.user_id == current_user.id)
    db_profile = session.exec(statement).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    db_profile.avatar_url = image_url
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile

@router.post("/me/banner", response_model=UserProfileOut)
async def upload_banner(
    *,
    session: Session = Depends(get_session),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Upload user banner.
    """
    # Upload to Cloudinary
    image_url = upload_image(file.file, folder="pulseos/banners")
    if not image_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload image to Cloudinary"
        )
    
    # Update profile in database
    statement = select(UserProfile).where(UserProfile.user_id == current_user.id)
    db_profile = session.exec(statement).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    db_profile.cover_pic_url = image_url
    session.add(db_profile)
    session.commit()
    session.refresh(db_profile)
    return db_profile
