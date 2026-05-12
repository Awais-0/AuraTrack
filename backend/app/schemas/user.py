from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

# Shared properties
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    username: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    username: str
    fullname: str
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None

# Properties to return via API
class UserOut(UserBase):
    id: int
    profile: Optional["UserProfileOut"] = None

    class Config:
        from_attributes = True

# User Profile Schemas
class UserProfileBase(BaseModel):
    fullname: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    about: Optional[str] = None
    avatar_url: Optional[str] = None
    cover_pic_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    membership_status: Optional[str] = None
    joined_at: Optional[datetime] = None

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileOut(UserProfileBase):
    id: int
    user_id: int
    joined_at: datetime

    class Config:
        from_attributes = True

# JSON Web Token
class Token(BaseModel):
    access_token: str
    token_type: str

# Contents of JWT token
class TokenData(BaseModel):
    sub: Optional[str] = None

UserOut.model_rebuild()
